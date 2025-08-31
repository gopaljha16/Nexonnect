const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or any SMTP provider
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Nexonnect" <${process.env.MAIL_USER}>`,
    to: email,
    subject,
    html: message,
  });
};

const emailVerificationDone = async (email) => {
  const subject = "Email Verification Successful";
  const message = "<h1>Your email has been verified successfully!</h1>";
  await sendEmail(email, subject, message);
};

module.exports = {sendEmail, emailVerificationDone};
