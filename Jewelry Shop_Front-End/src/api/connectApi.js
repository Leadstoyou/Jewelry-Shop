import axios from "axios";
import { useState } from "react";

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
    var pageCheck = activePage;
    if (activePage > 1) {
      pageCheck--;
    } else if (activePage === 1) {
      pageCheck = 1;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      { limit, page }
    );
    if (response.request.status === 200) {
      const dataNew = response.data.data.products;
      setAllproduct(dataNew);
      setTotalpage(response.data.data.totalPages);
    } else if (response.request.status === 204) {
      const res = await axios.post(
        `${import.meta.env.VITE_API_PRODUCTS}/view`,
        { limit, page: pageCheck }
      );
      if (res.request.status === 200) {
        const dataNew = res.data.data.products;
        setAllproduct(dataNew);
        setTotalpage(res.data.data.totalPages);
      }
    }
  } catch (err) {
    notify("Get data failed !!!");
  }
};

//getListProduct deleted
const getAllProductsDelete = async (
  setAllproduct,
  setTotalpage,
  notify,
  limitP,
  activePage,
  isDelete
) => {
  try {
    const limit = limitP;
    const page = activePage;
    const isDeleted = isDelete;
    var pageCheck = activePage;
    if (activePage > 1) {
      pageCheck--;
    } else if (activePage === 1) {
      pageCheck = 1;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_PRODUCTS}/view`,
      { limit, page, isDeleted: true }
    );
    if (response.request.status === 200) {
      const dataNew = response.data.data.products;
      setAllproduct(dataNew);
      setTotalpage(response.data.data.totalPages);
    } else if (response.request.status === 204) {
      const res = await axios.post(
        `${import.meta.env.VITE_API_PRODUCTS}/view`,
        { limit, page: pageCheck, isDeleted: true }
      );
      if (res.request.status === 200) {
        const dataNew = res.data.data.products;
        setAllproduct(dataNew);
        setTotalpage(res.data.data.totalPages);
      }
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
      data,
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
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
      //
    }
  } catch (error) {
    console.error(error); // Log the error for troubleshooting
    // notify("Failed when deleting product");
  }
};

//addToCart
const addToCartAPI = async (notify, success, newCart) => {
  try {
    const data = newCart;
    const headers = {
      withCredentials: true,
    };

    if (getAccessTokenFromCookie) {
      headers.Authorization = `Bearer ${getAccessTokenFromCookie()}`;
    }

    const response = await axios.post(
      "http://localhost:9999/api/v1/cart/add",
      data,
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.status === 200) {
      success("add to cart successfully !!!");
    } else {
      notify("Add to cart failed !!!");
    }
  } catch (error) {
    console.log(error);
    notify("Add to cart failed !!!");
  }
};

//getToken
const viewCartAPI = async (cartToken, setViewCart) => {
  try {
    const token = cartToken;

    const headers = {
      withCredentials: true,
    };

    if (getAccessTokenFromCookie) {
      const accessToken = getAccessTokenFromCookie(); // Call the function to get the access token
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await axios.get("http://localhost:9999/api/v1/cart/view", {
      headers: {
        Authorization: `Bearer ${getAccessTokenFromCookie()}`,
      },
      withCredentials: true, // Use the headers object you've constructed
    });
    console.log("API response:", response.data);
    if (response.status === 200) {
      setViewCart(response.data);
    } else {
      console.log("Failed to fetch cart data");
    }
  } catch (error) {
    console.error("Error while fetching cart data:", error);
  }
};

//update product in recycle
const updateInRecycler = async (notify, success, setUpdateData, idProduct) => {
  try {
    const id = idProduct;
    const isDeleted = false;
    const res = await axios.patch(
      `http://localhost:9999/api/v1/products/update/${id}`,
      { isDeleted }
    );
    if (res.status === 200) {
      console.log(res);
      setUpdateData(res.data.data);
      success("Update successfully");
    } else {
      notify("Error updating");
    }
  } catch (error) {
    notify("Error updating");
  }
};
//removeFromCart
const removeFromCart = async (productId, cartToken, setDeleteCart) => {
  try {
    const id = productId;
    const token = cartToken;
    const response = await axios.delete(
      `${import.meta.env.VITE_API_CART}/delete/${token}`,
      {
        data: { product_id: id }, // Use 'params' to send query parameters
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log(response);
      setDeleteCart(response.data);
      console.log("Product removed from the cart successfully !!!");
    } else {
      console.log("Failed to remove the product from the cart");
    }
  } catch (error) {
    console.log("Failed to remove the product from the cart"); // Log the error message here
  }
};

const updateCart = async (productId, quantity, setCartUpdate) => {
  try {
    const product_id = productId;

    const data = { product_id, quantity };
    const response = await axios.post(
      `${import.meta.env.VITE_API_CART}/update`,
      data,
      { withCredentials: true }
    );
    if (response.status === 200) {
      setCartUpdate(response.data.productList);
      console.log("Update cart successfully !!!");
    } else {
      console.log("Failed to update the cart");
    }
  } catch (error) {
    console.log("Failed to update the cart");
  }
};

const Logout = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9999/api/v1/account/logout",
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log("Logout successfully");
    } else {
      console.log("Failed to log out ");
    }
  } catch (error) {
    console.log(error);
  }
};

const createNewOrder = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_ORDER}/checkouts`,
      {
        orderStatus:true
      },
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
      withCredentials: true,
    }
    );
    if (response.status === 200) {
      console.log("Logout successfully");
    } else {
      console.log("Failed to log out ");
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  addToCartAPI,
  viewCartAPI,
  getAllProductsDelete,
  updateInRecycler,
  removeFromCart,
  updateCart,
  Logout,
  createNewOrder
};
