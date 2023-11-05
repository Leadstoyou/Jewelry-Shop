import axios from "axios";

const createNewPaymentAPI = async () => {
  try {
    const response = await axios.post(
      "http://localhost:9999/api/v1/payment/create_payment_url",
      {
        body: "1",
      }
    );
    var form = document.createElement("form");
    form.method = "POST";
    form.action = "http://localhost:9999/api/v1/payment/create_payment_url";
    form.target = "_blank";
    document.body.appendChild(form);
    form.submit();

    // Loại bỏ form sau khi hoàn thành
    document.body.removeChild(form);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
export { createNewPaymentAPI };
