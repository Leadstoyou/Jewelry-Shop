import sendEmailService from "./sendEmailService.js";

const handleSendEmailService = (userData) => {
    const verificationCodeLink = `${process.env.FRONT_END_URL}/success/${userData.userVerifyResetToken}`;
    const emailSubject = "Bạn chưa xác mình tài khoản của bạn";
    const emailBody = `Xin chào ${userData.userName},\n\nVui lòng nhấn vào liên kết sau để xác minh tài khoản của bạn:\n\n <a href="${verificationCodeLink}">Click Here!</a>`;
    sendEmailService.sendEmailService(userData.userEmail, emailSubject, emailBody);
}

export default {handleSendEmailService}