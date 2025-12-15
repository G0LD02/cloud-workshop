import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(to: string, ticketId: string) {
  const url = `${process.env.APP_BASE_URL}/ticket/${ticketId}`;

  return await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: 'Your Cloud Workshop Registration is Approved!',
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Registration Approved 🎉</h2>
        <p>Your workshop registration has been approved.</p>
        <p>Scan the QR code at the venue or open your ticket:</p>
        <a href="${url}" style="color: blue;">View Your Ticket</a>
      </div>
    `,
  });
}

export async function sendRejectionEmail(to: string) {
  return await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: 'Cloud Workshop – Payment Issue',
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Payment Could Not Be Verified</h2>
        <p>Your registration was rejected because the payment receipt could not be verified.</p>
        <p>If this is a mistake, please contact:</p>
        <p><strong>${process.env.SUPPORT_PHONE}</strong></p>
      </div>
    `,
  });
}
