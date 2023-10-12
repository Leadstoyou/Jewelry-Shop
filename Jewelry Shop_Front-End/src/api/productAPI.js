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
  setLoading,
  navigate
) => {
  try {
    // const categories = ["Dây Chuyền", "Vòng", "Hoa Tai", "Charm", "Nhẫn"];
    const accessToken = getAccessTokenFromCookie();
    const response = await axios.post(
      "http://localhost:9999/api/v1/products/view",
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
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    const data = response.data?.data;
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
    navigate("/login");
    console.error("Error fetching data:", error);
  }
};

export { CollectionAPI };
