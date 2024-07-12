const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
  const transport = {
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE, //true for 465,  false for other ports-587,2525

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
  const transporter = nodeMailer.createTransport(transport);
  const message = {
    from: `${process.env.SMTP_FROM_NAME} <12> ${process.env.SMTP_FROM_EMAIL}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log(options.email);
  await transporter.sendMail(message);
};

module.exports = sendEmail;
