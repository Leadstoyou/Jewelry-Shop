import nodemailer from "nodemailer";

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SEND_MAIL_HOST,
    port: process.env.SEND_MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.SEND_MAIL_EMAIL,
      pass: process.env.SEND_MAIL_PASSWORD,
    },
  });
  return transporter;
};

const sendEmailService = async (to, emailSubject, emailBody) => {
  const transporter = createTransporter();
  const mainOptions = {
    from: process.env.SEND_MAIL_ADDRESS,
    to: to,
    subject: emailSubject,
    text: "You received a message",
    html: emailBody,
  };
  try {
    const info = await transporter.sendMail(mainOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

export default { sendEmailService };
