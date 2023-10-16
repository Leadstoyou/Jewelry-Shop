import axios from "axios";

//get All products
const getAllProducts = async (setAllproduct, notify) => {
  try {
    const response = await axios.post(
      "http://localhost:9999/api/v1/products/view"
    );
    if (response.request.status === 200) {
      const dataNew = response.data.data;
      setAllproduct(dataNew);
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
      "http://localhost:9999/api/v1/products/create",
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
      `http://localhost:9999/api/v1/products/update/${id}`,
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
      `http://localhost:9999/api/v1/products/delete/${id}`
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
