import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.post(
      'http://localhost:9999/api/v1/products/view',
      { category: 'Charm' },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data.data.length)

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();