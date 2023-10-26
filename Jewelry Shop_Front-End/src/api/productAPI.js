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
  category,
  color,
  material,
  price,
  sort,
  setColorsArray,
  setMaterialArray,
  setFoundProducts,
  setLoading,toast,navigate
) => {
  try {
    const categories = ["Dây Chuyền", "Vòng tay", "Hoa Tai", "Charm", "Nhẫn"];
    if (!categories.includes(category)) {
      throw new Error("Invalid category");
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        category: category,
        color: color,
        material: material,
        minPrice: price?.minPrice,
        maxPrice: price?.maxPrice,
        sort: sort,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );

    const data = response.data?.data?.products;
    if (!color && !material && !price && !sort) {
      const extractUnique = (property) => [
        ...new Set(data.flatMap((value) => value[property])),
      ];
      setMaterialArray(extractUnique("productMaterials"));
      setColorsArray(extractUnique("productColors"));
    }
    setFoundProducts(data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    if(error.response.status === 401){
      navigate('/login');
    }
    toast.error(error.response.data.message);
    console.error("Error fetching data:", error.response.data.message);
  }
};

const CollectionAPISearch = async (
  searchName,
  color,
  material,
  price,
  sort,
  setColorsArray,
  setMaterialArray,
  setFoundProducts,
  setLoading,toast,navigate
) => {
  try {

    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      {
        searchName: searchName,
        color: color,
        material: material,
        minPrice: price?.minPrice,
        maxPrice: price?.maxPrice,
        sort: sort,
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );

    const data = response.data?.data?.products;
    if (!color && !material && !price && !sort) {
      const extractUnique = (property) => [
        ...new Set(data.flatMap((value) => value[property])),
      ];
      setMaterialArray(extractUnique("productMaterials"));
      setColorsArray(extractUnique("productColors"));
    }
    setFoundProducts(data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    if(error.response.status === 401){
      navigate('/login');
    }
    toast.error(error.response.data.message);
    console.error("Error fetching data:", error.response.data.message);
  }
};

export { CollectionAPI , CollectionAPISearch };
