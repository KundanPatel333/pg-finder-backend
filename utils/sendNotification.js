const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendVisitCodeNotification = async (ownerPhone, studentName, visitCode, date) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${ownerPhone}`,
      body: `New visit scheduled!\nStudent: ${studentName}\nDate: ${date}\nVisit code: ${visitCode}\nReply "CONFIRM ${visitCode}" when the student visits.`,
    });
  } catch (err) {
    console.error("Notification failed:", err.message);
  }
};

module.exports = { sendVisitCodeNotification };