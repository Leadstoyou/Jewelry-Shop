import sendEmailService from "./sendEmailService.js";

const verifySendEmailService = (userData) => {
  const verificationCodeLink = `${process.env.FRONT_END_URL}/success/${userData.userVerifyResetToken}`;
  const emailSubject = "Bạn chưa xác mình tài khoản của bạn";
  const emailBody = `Xin chào ${userData.userName},\n\nVui lòng nhấn vào liên kết sau để xác minh tài khoản của bạn:\n\n <a href="${verificationCodeLink}">Click Here!</a>`;
  sendEmailService.sendEmailService(
    userData.userEmail,
    emailSubject,
    emailBody
  );
};

const forgotPasswordSendEmailService = (userData) => {
  const resetToken = userData.userPasswordResetToken;
  const emailSubject = "Bạn quên mật khẩu";
  const emailBody = `Đây là code để cập nhật lại mật khẩu mới, mã code tồn tại trong 15p: ${resetToken}`;
  sendEmailService.sendEmailService(
    userData.userEmail,
    emailSubject,
    emailBody
  );
};

const orderSendEmailService = (userData) => {
  const emailSubject = "Bạn mới đặt một đơn hàng";

  const productList = userData.productList;
  let productListHTML = "";
  for (const product of productList) {
    productListHTML += `
        <tr>
          <td>${product.productname}</td>
          <td><img src="${product.productimage}" alt="Product Image"></td>
          <td>${product.productquantity}</td>
          <td>${product.productprice}</td>
        </tr>
      `;
  }

  const emailBody = `
  <p>Đơn hàng đã đặt</p>
  <p>Tên khách hàng ${userData.userName}</p>
  <p>Email khách hàng ${userData.userEmail}</p>
  <p>Số điện thoại khách hàng ${userData.userPhoneNumber}</p>
  <p>Ngày đặt hàng ${userData.orderDate}</p>
  <table border="1">
    <tr>
      <th>Product Name</th>
      <th>Product Image</th>
      <th>Product Quantity</th>
      <th>Product Price</th>
    </tr>
    ${productListHTML}
  </table>
`;
  sendEmailService.sendEmailService(
    userData.userEmail,
    emailSubject,
    emailBody
  );
};

export default { verifySendEmailService, forgotPasswordSendEmailService ,orderSendEmailService};
