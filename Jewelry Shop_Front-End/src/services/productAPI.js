import axios from "axios";
function getAccessTokenFromCookie() {
  const name = "accessToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

const CollectionAPI = async (
  limitP,
  setTotalpage,
  setTotalSize,
  activePage,
  category,
  color,
  material,
  price,
  sort,
  setFoundProducts,
  setLoading,
  toast,
  navigate,
  maxPriceValue,
  setSpinsearch
) => {
  try {
    
    let maxPrice, minPrice;
    if (maxPriceValue) {
      maxPrice = JSON.parse(maxPriceValue);
      minPrice = JSON.parse(0);
    } else if (price) {
      maxPrice = JSON.parse(price)?.maxPrice;
      minPrice = JSON.parse(price)?.minPrice;
    }
    console.log("ldmas", category);
    const categories = ["Dây Chuyền", "Vòng tay", "Hoa Tai", "Charm", "Nhẫn"];
    if (!categories.includes(category)) {
      throw new Error("Invalid category");
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        limit: limitP,
        page: activePage,
        isDeleted: false,
        category: category,
        color: color,
        material: material,
        minPrice,
        maxPrice,
        sort: JSON.parse(sort),
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );
    setSpinsearch(true)
    setTimeout(() => {
      setSpinsearch(false);
    }, 2000);
    const data = response.data?.data?.products;
    const totalPage = response?.data?.data?.totalPages;
    const totalPro = response?.data?.data?.totalProducts;
    console.log(response);
    setTotalpage(totalPage);
    setTotalSize(totalPro);
    setFoundProducts(data);
  
  } catch (error) {
    setLoading(false);
    console.error("Error fetching data:", error);
  }
};

const CollectionAPISearch = async (
  limitP,
  setTotalpage,
  setTotalSize,
  activePage,
  searchName,
  color,
  material,
  price,
  sort,
  setFoundProducts,
  setLoading,
  toast,
  navigate,
  setSpinsearch
) => {
  try {
    // Create the base payload object
    const payload = {
      limit: limitP,
      page: activePage,
      isDeleted: false,
      color,
      material,
      minPrice: JSON.parse(price)?.minPrice,
      maxPrice: JSON.parse(price)?.maxPrice,
      sort: JSON.parse(sort),
    };

    // Conditionally add the searchName property
    if (searchName) {
      payload.searchName = searchName;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );

    const data = response.data?.data?.products;
    const totalPage = response?.data?.data?.totalPages;
    const totalPro = response?.data?.data?.totalProducts;
    setTotalpage(totalPage);
    setTotalSize(totalPro);
    setFoundProducts(data);
    setTimeout(() => {
      setSpinsearch(false);
    }, 2000);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login");
    }

    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Error fetching data");
    }

    console.error("Error fetching data:", error);
  }
};

const CollectionFilterSearch = async (
  setFilterProduct,
  searchName,
  color,
  material,
  price,
  sort,
  setSpinsearch
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        isDeleted: false,
        searchName: searchName,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );

    const data = response.data?.data?.products;
    setFilterProduct(data);
    setTimeout(() => {
      setSpinsearch(false);
    }, 2000);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data?.message || error.message
    );
  }
};

const CollectionFilterSearchAndPagination = async (
  setFilterProduct,
  searchName,
  limitP,
  setTotalpage,
  activePage
) => {
  try {
    const limit = limitP;
    // const page = activePage;
    var pageCheck = activePage;
    if (activePage === 1) {
      pageCheck = 1;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        isDeleted: false,
        searchName: searchName,
        limit,
        page: pageCheck,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );

    const data = response.data?.data?.products;
    setFilterProduct(data);
    setTotalpage(response.data.data.totalPages);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data?.message || error.message
    );
  }
};

const CollectionFilterSearchDeleteAndPagination = async (
  setFilterProduct,
  searchName,
  limitP,
  setTotalpage,
  activePage
) => {
  try {
    const limit = limitP;
    // const page = activePage;
    var pageCheck = activePage;
    if (activePage === 1) {
      pageCheck = 1;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        isDeleted: true,
        searchName: searchName,
        limit,
        page: pageCheck,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );

    const data = response.data?.data?.products;
    setFilterProduct(data);
    setTotalpage(response.data.data.totalPages);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data?.message || error.message
    );
  }
};

const CollectionFilterCategory = async (
  setFilterProduct,
  category,
  color,
  material,
  price,
  sort,
  maxPrice
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        isDeleted: false,
        category: category,
        minPrice: 0,
        maxPrice: maxPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );
    console.log("123", response);
    const data = response.data?.data?.products;
    setFilterProduct(data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data?.message || error.message
    );
  }
};
const viewOrderDetail = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ORDER}/viewOrder`,
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(
      "🚀 ~ file: productAPI.js:214 ~ viewOrderDetail ~ error:",
      error
    );
  }
};

export {
  CollectionAPI,
  CollectionFilterSearchDeleteAndPagination,
  CollectionAPISearch,
  CollectionFilterSearch,
  CollectionFilterCategory,
  CollectionFilterSearchAndPagination,
  viewOrderDetail,
};
