const url = "http://localhost:9999/api/v1"

const searchPage =  async function fetchData(searchtext) {
    try {
      const response = await axios.get(
        `${url}/${searchtext}`
      );
      const data = response.data.data;
      setFoundProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }

  