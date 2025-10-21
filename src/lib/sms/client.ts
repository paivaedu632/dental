import Twilio from "twilio";

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER;

if (!ACCOUNT_SID || !AUTH_TOKEN) {
  throw new Error("Missing Twilio env vars: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN");
}

export const twilio = new Twilio(ACCOUNT_SID, AUTH_TOKEN);

export async function sendSMS({
  to,
  body,
  from,
}: {
  to: string;
  body: string;
  from?: string;
}) {
  const sender = from ?? FROM_NUMBER;
  if (!sender) {
    throw new Error("Missing TWILIO_PHONE_NUMBER env var or 'from' parameter");
  }
  return await twilio.messages.create({ to, from: sender, body });
}