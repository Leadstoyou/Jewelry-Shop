import axios from "axios";
import { login } from "../redux/Login.jsx";
function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === cookieName) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
}

export const fetchDataAndDispatch = (dispatch) => {
  const accessToken = getCookieValue("accessToken");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  if (accessToken) {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:9999/api/v1/users/viewProfile",
        axiosConfig
      );
      dispatch(login(res.data.data));
      console.log("vasl");
    };
    fetchData();
  }else{
    dispatch(login())
  }
};
