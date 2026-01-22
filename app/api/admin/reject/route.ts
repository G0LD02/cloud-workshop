// app/api/admin/reject/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { Resend } from 'resend';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // ✅ auth check INSIDE handler
  const auth = (await cookies()).get('admin-auth')?.value;
  if (auth !== 'true') {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.EMAIL_FROM || 'no-reply@example.com';
  const supportPhone = process.env.SUPPORT_PHONE || '+60-0000-0000';

  // ✅ create client only if key exists
  const resend = resendKey ? new Resend(resendKey) : null;

  try {
    const body = (await req.json()) as { id?: string };

    if (!body.id) {
      return NextResponse.json(
        { ok: false, errors: ['Missing registration id'] },
        { status: 400 },
      );
    }

    const { data: reg, error } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .eq('id', body.id)
      .maybeSingle();

    if (error || !reg) {
      console.error('Reject: registration not found', error);
      return NextResponse.json(
        { ok: false, errors: ['Registration not found'] },
        { status: 404 },
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({ status: 'rejected' })
      .eq('id', body.id);

    if (updateError) {
      console.error('Reject update error:', updateError);
      return NextResponse.json(
        { ok: false, errors: ['Failed to update registration status'] },
        { status: 500 },
      );
    }

    // send rejection email (only if configured)
    if (resend) {
      try {
        const html = `
            <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">

    <h2 style="color: #1c4e80; margin-bottom: 12px;">
      Cloud Workshop – Payment Could Not Be Verified
    </h2>

    <p>Hi ${reg.full_name || 'participant'},</p>

    <p>
      Unfortunately, we were not able to verify your payment and your 
      workshop registration has been <strong>rejected</strong> for now.
    </p>

    <p>
      This usually happens when the uploaded receipt is unclear, incorrect, 
      or missing required transaction details.
    </p>

    <p style="margin-top: 12px;">
      If you believe this is a mistake, please reach out to us at 
      <strong>${supportPhone}</strong> and mention the email you used during registration.
    </p>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #d7e3ee;" />

    <p style="font-size: 13px; color: #444;">
      You may submit a new registration at any time with a clear receipt screenshot.
    </p>

  </div>
        `;

        await resend.emails.send({
          from: resendFrom,
          to: reg.email,
          subject: 'Cloud Workshop – Payment Could Not Be Verified',
          html,
        });
      } catch (emailErr) {
        console.error('Reject email send error:', emailErr);
      }
    } else {
      console.warn('RESEND_API_KEY not set – skipping rejection email.');
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Reject API error:', err);
    return NextResponse.json(
      { ok: false, errors: ['Internal server error'] },
      { status: 500 },
    );
  }
}
