// app/api/admin/approve/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { Resend } from 'resend';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  // ✅ auth check MUST be inside the handler
  const auth = (await cookies()).get('admin-auth')?.value;
  if (auth !== 'true') {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  // ✅ create Resend inside (and only if key exists)
  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

  try {
    const { id } = await req.json();

    const { data: reg, error } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !reg) {
      return NextResponse.json(
        { ok: false, error: 'Registration not found' },
        { status: 404 },
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({ status: 'approved' })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json(
        { ok: false, error: 'Failed to update status' },
        { status: 500 },
      );
    }

    // send approval email (only if configured)
    if (resend && process.env.EMAIL_FROM) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: reg.email,
        subject: 'Cloud Workshop – Registration Approved',
        html: `
  <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">

    <h2 style="color: #1c4e80; margin-bottom: 12px;">
      Cloud Workshop – Registration Approved
    </h2>

    <p>Hi ${reg.full_name || 'participant'},</p>

    <p>Your payment has been verified and your seat for the Cloud Workshop is 
      <strong>confirmed</strong>.
    </p>

    <p>Please bring this email and a valid ID to the workshop check-in desk.</p>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #d7e3ee;" />

    <h3 style="color: #1c4e80; margin-bottom: 8px;">Join the Official Discord</h3>

    <p style="margin-bottom: 6px;">
      Make sure to join the workshop's Discord server to receive important updates,
      workshop materials, and announcements:
    </p>

    <p style="margin-top: 10px;">
      <a href="https://discord.gg/PwUFGcXksP"
         style="
           display: inline-block;
           background: #1c4e80;
           color: white;
           padding: 10px 18px;
           border-radius: 8px;
           font-weight: 600;
           text-decoration: none;
         ">
         Join Discord Server
      </a>
    </p>

    <p style="margin-top: 14px; font-size: 13px; color: #0f1c2e;">
      (Please join before the workshop starts.)
    </p>

  </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Approve API error:', e);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
