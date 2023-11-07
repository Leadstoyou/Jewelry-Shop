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
  console.log("debug", userData);
  const emailSubject = "Bạn mới đặt một đơn hàng";

  const productList1 = userData.productList;
  console.log("debug2", productList1);
  let productListHTML = "";
  for (const product of productList1) {
    productListHTML += `
        <tr>
          <td>${product.productName}</td>
          <td><img src="${product.productImage}" alt="Product Image"></td>
          <td>${product.productQuantity}</td>
          <td>${product.productPrice}</td>
        </tr>
      `;
  }
  const emailBody = `
  <h1>Đơn hàng đã đặt</h1>
  <p>Tên khách hàng: ${userData.userName}</p>
  <p>Email khách hàng: ${userData.userEmail}</p>
  <p>Số điện thoại: ${userData.userPhoneNumber}</p>
  <p>Ngày đặt hàng: ${userData.orderDate}</p>
  <table border="1">
    <tr>
      <th>Product Name</th>
      <th>Product Image</th>
      <th>Product Quantity</th>
      <th>Product Price</th>
    </tr>
    ${productListHTML}
  </table>
  <p>Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi.</p>
  <p>From JEWELRY SHOP WITH LOVE!</p>
`;
  sendEmailService.sendEmailService(
    userData.userEmail,
    emailSubject,
    emailBody
  );
};

export default {
  verifySendEmailService,
  forgotPasswordSendEmailService,
  orderSendEmailService,
};
