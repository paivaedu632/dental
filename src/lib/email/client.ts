import { Resend } from "resend";

const RESEND_KEY = process.env.RESEND_API_KEY;

if (!RESEND_KEY) {
  throw new Error("Missing RESEND_API_KEY env var");
}

export const resend = new Resend(RESEND_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  from,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  return await resend.emails.send({
    from: from ?? "DentaFlow <noreply@dentalflow.app>",
    to,
    subject,
    html,
  });
}