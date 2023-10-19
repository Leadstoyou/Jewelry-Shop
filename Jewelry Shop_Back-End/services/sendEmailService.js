import nodemailer from "nodemailer";
import config from "../config/config.js";

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host:config.sendEmailConfig.SEND_MAIL_HOST,
    port: config.sendEmailConfig.SEND_MAIL_PORT,
    secure: false,
    auth: {
      user: config.sendEmailConfig.SEND_MAIL_EMAIL,
      pass: config.sendEmailConfig.SEND_MAIL_PASSWORD,
    },
  });
  return transporter;
};

const sendEmailService = async (to, emailSubject, emailBody) => {
  const transporter = createTransporter();
  const mainOptions = {
    from: config.sendEmailConfig.SEND_MAIL_ADDRESS,
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
