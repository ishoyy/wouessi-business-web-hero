import nodemailer from 'nodemailer';
export async function sendLeadEmail(subject: string, html: string) {
  const enabled = process.env.SMTP_HOST && process.env.LEADS_NOTIFY_TO;
  if (!enabled) return;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
  await transporter.sendMail({
    from: process.env.LEADS_NOTIFY_FROM || process.env.SMTP_USER,
    to: process.env.LEADS_NOTIFY_TO,
    subject,
    html
  });
}
