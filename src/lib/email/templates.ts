export function paymentConfirmedEmail(dentistName: string, onboardingLink?: string) {
  const linkHtml = onboardingLink
    ? `<p style="margin:16px 0">Finish setup in 2 minutes: <a href="${onboardingLink}" style="color:#0066CC">Complete Onboarding</a></p>`
    : '';
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 12px">Payment Confirmed</h1>
    <p style="margin:0 0 12px">Hi ${dentistName},</p>
    <p style="margin:0 0 12px">Thanks for joining DentalFlow. Your payment is confirmed and we're ready to launch your ads.</p>
    ${linkHtml}
    <p style="margin:16px 0;color:#666">If you didn’t expect this email, please ignore.</p>
  </div>`;
}

export function appointmentConfirmationEmail(
  patientName: string,
  dentistName: string,
  datetime: string,
  address: string,
  rescheduleLink?: string
) {
  const rescheduleHtml = rescheduleLink
    ? `<p style="margin:16px 0">Need to reschedule? <a href="${rescheduleLink}" style="color:#0066CC">Click here</a></p>`
    : '';
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 12px">Appointment Confirmed</h1>
    <p style="margin:0 0 12px">Hi ${patientName}, your appointment with ${dentistName} is confirmed.</p>
    <p style="margin:0 0 12px"><strong>When:</strong> ${datetime}</p>
    <p style="margin:0 0 12px"><strong>Where:</strong> ${address}</p>
    ${rescheduleHtml}
    <p style="margin:16px 0;color:#666">We look forward to seeing you.</p>
  </div>`;
}

export function paymentFailedEmail(dentistName: string) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 12px">Payment Failed</h1>
    <p style="margin:0 0 12px">Hi ${dentistName}, your last payment attempt failed.</p>
    <p style="margin:0 0 12px">Please update your payment method to avoid service interruption.</p>
    <p style="margin:16px 0;color:#666">If you recently updated your card, you can ignore this.</p>
  </div>`;
}

export function adsLiveEmail(dentistName: string, dashboardLink?: string) {
  const linkHtml = dashboardLink
    ? `<p style="margin:16px 0">View performance: <a href="${dashboardLink}" style="color:#0066CC">Open Dashboard</a></p>`
    : ''
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 12px">Your Ads Are Live</h1>
    <p style="margin:0 0 12px">Hi ${dentistName}, your campaign is live. We’ll monitor performance and optimize daily.</p>
    ${linkHtml}
    <p style="margin:16px 0;color:#666">You’ll receive updates as bookings start to come in.</p>
  </div>`;
}

export function firstBookingEmail(
  dentistName: string,
  patientName: string,
  appointmentTime: string,
  dashboardLink?: string
) {
  const linkHtml = dashboardLink
    ? `<p style="margin:16px 0">Manage bookings: <a href="${dashboardLink}" style="color:#0066CC">Open Dashboard</a></p>`
    : ''
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 12px">First Booking!</h1>
    <p style="margin:0 0 12px">Hi ${dentistName}, ${patientName} just booked an appointment for ${appointmentTime}.</p>
    ${linkHtml}
    <p style="margin:16px 0;color:#666">We’ll keep pushing to hit your patient goals.</p>
  </div>`;
}

export function trialCompleteEmail(dentistName: string, resultsSummary: string) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 12px">Trial Complete</h1>
    <p style="margin:0 0 12px">Hi ${dentistName}, your trial period has completed.</p>
    <p style="margin:0 0 12px">Results: ${resultsSummary}</p>
    <p style="margin:16px 0;color:#666">Reply to this email if you’d like help reviewing the results.</p>
  </div>`;
}

export function reminderEmail(
  patientName: string,
  dentistName: string,
  datetime: string,
  address: string
) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 12px">Appointment Reminder</h1>
    <p style="margin:0 0 12px">Hi ${patientName}, this is a reminder for your visit with ${dentistName}.</p>
    <p style="margin:0 0 12px"><strong>When:</strong> ${datetime}</p>
    <p style="margin:0 0 12px"><strong>Where:</strong> ${address}</p>
    <p style="margin:16px 0;color:#666">Reply to this email if you need to reschedule.</p>
  </div>`;
}

export function adminNewDentistEmail({
  dentistName,
  dentistEmail,
  dentistId,
  zip,
  state,
  landingPageUrl,
  pixelRegion,
}: {
  dentistName: string;
  dentistEmail: string;
  dentistId: string;
  zip: string;
  state: string;
  landingPageUrl?: string;
  pixelRegion?: string;
}) {
  const lp = landingPageUrl
    ? `<p style="margin:8px 0"><strong>Landing Page:</strong> <a href="${landingPageUrl}" style="color:#0066CC">${landingPageUrl}</a></p>`
    : '';
  const pixel = pixelRegion
    ? `<p style="margin:8px 0"><strong>Regional Pixel:</strong> ${pixelRegion}</p>`
    : '';
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 12px">New Dentist — Create Ad Group</h1>
    <p style="margin:0 0 12px">A new dentist completed payment. Set up their manual ad group.</p>
    <div style="margin:16px 0;padding:12px;border:1px solid #eee;border-radius:8px">
      <p style="margin:8px 0"><strong>Name:</strong> ${dentistName}</p>
      <p style="margin:8px 0"><strong>Email:</strong> ${dentistEmail}</p>
      <p style="margin:8px 0"><strong>Dentist ID:</strong> ${dentistId}</p>
      <p style="margin:8px 0"><strong>ZIP:</strong> ${zip}</p>
      <p style="margin:8px 0"><strong>State:</strong> ${state}</p>
      ${pixel}
      ${lp}
    </div>

    <h2 style="font-size:16px;margin:16px 0 8px">Manual Setup Steps</h2>
    <ol style="padding-left:20px;margin:0 0 12px">
      <li style="margin:6px 0">Duplicate the master ad group in TikTok Ads Manager</li>
      <li style="margin:6px 0">Set location targeting to the dentist's ZIP and adjacent areas</li>
      <li style="margin:6px 0">Use the regional pixel listed above</li>
      <li style="margin:6px 0">Update the landing page URL to the dentist-specific path</li>
      <li style="margin:6px 0">Confirm conversion tracking and publish</li>
    </ol>
    <p style="margin:16px 0;color:#666">Reply to this email when the ad group is live.</p>
  </div>`;
}