import axios from "axios";

async function fetchData(data) {
  try {
    const response = await axios.put(
      `http://localhost:9999/api/v1/feedback/update/654602dce3445eb11966a475`,
      
        data
      ,
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        },
        withCredentials: true,
      }
    );
    console.log(response?.data)
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
function getAccessTokenFromCookie() {
  // const name = "accessToken=";
  // const decodedCookie = decodeURIComponent(document.cookie);
  // const cookieArray = decodedCookie.split(";");

  // for (let i = 0; i < cookieArray.length; i++) {
  //   let cookie = cookieArray[i].trim();
  //   if (cookie.indexOf(name) === 0) {
  //     return cookie.substring(name.length, cookie.length);
  //   }
  // }
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI2YmRkOGJjNTM3OTYxYTFlOTRkMjMiLCJ1c2VyUm9sZSI6MCwiaWF0IjoxNjk4OTczMjY2LCJleHAiOjE2OTkwNTk2NjZ9.JZeZNmHPtist9axB0nxoBj6aRFlN5cWd6-DjTpP5sY8";
}
const updateData = {
  star: 8,
};
fetchData(updateData);
