import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.post(
      "http://localhost:9999/api/v1/payment/create_payment_url"
    );
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
