import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.post(
      "http://localhost:9999/api/v1/products/view",
      { category: "Hoa Tai" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const lmeo = response.data.data;
    const extractUnique = (property) => [...new Set(lmeo.flatMap((value) => value[property]))];

    const uniqueColorsArray = extractUnique("productColors");
    const uniqueMaterialsArray = extractUnique("productMaterials");

    console.log(uniqueColorsArray,uniqueMaterialsArray);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();