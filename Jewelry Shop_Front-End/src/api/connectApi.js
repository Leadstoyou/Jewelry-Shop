import axios from "axios";

//get All products
const getAllProducts = async (
  setAllproduct,
  setTotalpage,
  notify,
  limitP,
  activePage
) => {
  try {
    const limit = limitP;
    const page = activePage;
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      { limit, page }
    );
    if (response.request.status === 200) {
      const dataNew = response.data.data.products;
      setAllproduct(dataNew);
      setTotalpage(response.data.data.totalPages);
    } else {
      notify("Get data failed !!!");
    }
  } catch (err) {
    notify("Get data failed !!!");
  }
};

//add a product
const addProduct = async (addData, success, notify) => {
  try {
    const data = addData;
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/create`,
      data
    );
    if (response.status === 200) {
      success("Add product successfully !!!");
    } else {
      notify("Failed when adding product");
    }
  } catch (error) {
    notify("Failed when adding product");
  }
};

//update product
const updateProduct = async (_id, notify, success, newData) => {
  try {
    const id = _id;
    const data = newData;
    const response = await axios.patch(
      `${import.meta.env.VITE_API_PRODUCTS}/update/${id}`,
      data
    );
    if (response.status === 200) {
      console.log(response);
      success("Update product successfully !!!");
    } else {
      notify("Failed when updating product");
    }
  } catch (error) {
    notify("Failed when updating product");
  }
};

//delete product
const deleteProduct = async (_id) => {
  try {
    const id = _id;
    const response = await axios.delete(
      `${import.meta.env.VITE_API_PRODUCTS}/delete/${id}`
    );
    if (response.status === 204) {
    } else {
      // notify("Failed when deleting product");
    }
  } catch (error) {
    console.error(error); // Log the error for troubleshooting
    // notify("Failed when deleting product");
  }
};

export { getAllProducts, addProduct, updateProduct, deleteProduct };
