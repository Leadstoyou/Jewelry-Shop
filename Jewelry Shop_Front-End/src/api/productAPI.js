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
  navigate
) => {
  try {
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
        minPrice: JSON.parse(price)?.minPrice,
        maxPrice: JSON.parse(price)?.maxPrice,
        sort: JSON.parse(sort),
      },
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
    console.log(response);
    setTotalpage(totalPage);
    setTotalSize(totalPro);
    setFoundProducts(data);
    setLoading(false);
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
  navigate
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        limit: limitP,
        page: activePage,
        isDeleted: false,
        searchName: searchName,
        color: color,
        material: material,
        minPrice: JSON.parse(price)?.minPrice,
        maxPrice: JSON.parse(price)?.maxPrice,
        sort: JSON.parse(sort),
      },
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
    setLoading(false);
  } catch (error) {
    setLoading(false);

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
  sort
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
  sort
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        isDeleted: false,
        category: category,
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
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data?.message || error.message
    );
  }
};

export { CollectionAPI, CollectionAPISearch, CollectionFilterSearch ,CollectionFilterCategory};
