import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.post(
      `
      http://localhost:9999/api/v1/cart/add`,{
        "product_id": "652c0df771389b6616c1a546",
        "quantity": 1,
        "size": "sdf",
        "color": "dsfg",
        "material": "dsfg",
        "price": 4490000,
        "productImage": "https://res.cloudinary.com/dotknkcep/image/upload/v1697385977/Product-Image/qhot4qtjn6yeiatps4mw.jpg",
        "productDescription": "sda"
    },
      {
        headers: {
          Authorization: `Bearer `,
        },
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.status === 200) {
    } else {
    }
  } catch (error) {
    console.log(error);
  }
}

fetchData();