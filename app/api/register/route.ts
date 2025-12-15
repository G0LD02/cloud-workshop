// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export const runtime = 'nodejs'; // we use Buffer, not Edge

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fullName = String(formData.get('fullName') || '').trim();
    const tpNumber = String(formData.get('tpNumber') || '').trim(); // NEW
    const sex = String(formData.get('sex') || '').trim();
    const ageRaw = String(formData.get('age') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const nationality = String(formData.get('nationality') || '').trim();
    const receipt = formData.get('receipt') as File | null;

    const errors: string[] = [];

    // -------- Validation --------
    if (!fullName || fullName.length < 2) {
      errors.push('Full name is required.');
    }

    // TP Number validation (NEW)
    if (!tpNumber) {
      errors.push('TP Number is required.');
    } else if (tpNumber.length < 5) {
      errors.push('TP Number looks too short.');
    }

    if (!sex || !['male', 'female'].includes(sex)) {
      errors.push('Sex is invalid.');
    }

    const age = Number(ageRaw);
    if (!age || Number.isNaN(age) || age < 13 || age > 100) {
      errors.push('Age is invalid.');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Valid email is required.');
    }

    if (!phone || phone.length < 7) {
      errors.push('Valid phone number is required.');
    }

    if (!nationality) {
      errors.push('Nationality is required.');
    }

    if (!receipt) {
      errors.push('Payment receipt is required.');
    } else {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(receipt.type)) {
        errors.push('Receipt file type is not allowed.');
      }
      const maxSizeBytes = 5 * 1024 * 1024; // 5MB
      if (receipt.size > maxSizeBytes) {
        errors.push('Receipt file is too large (max 5MB).');
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // -------- Upload receipt to Supabase Storage --------
    if (!receipt) {
      // Type safety paranoia
      return NextResponse.json(
        { ok: false, errors: ['Receipt missing'] },
        { status: 400 }
      );
    }

    const arrayBuf = await receipt.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    const origName = receipt.name || 'receipt';
    const safeName = origName.replace(/[^a-z0-9\.\-]/gi, '_');
    const ext =
      safeName.split('.').pop()?.toLowerCase() ||
      (receipt.type === 'application/pdf' ? 'pdf' : 'bin');

    const fileName = `${Date.now()}_${fullName
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '_')}.${ext}`;

    const filePath = `workshop/${fileName}`; // folder inside 'receipts' bucket

    const { error: uploadError } = await supabaseAdmin.storage
      .from('receipts')
      .upload(filePath, buffer, {
        contentType: receipt.type,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json(
        { ok: false, errors: ['Failed to upload receipt. Please try again.'] },
        { status: 500 }
      );
    }

    // -------- Insert registration row --------
    const { data, error: insertError } = await supabaseAdmin
      .from('registrations')
      .insert({
        full_name: fullName,
        tp_number: tpNumber, // NEW
        sex,
        age,
        email,
        phone,
        nationality,
        receipt_path: filePath,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { ok: false, errors: ['Failed to save registration.'] },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, registration: data }, { status: 201 });
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json(
      { ok: false, errors: ['Internal server error'] },
      { status: 500 }
    );
  }
}
