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
  
  const accessToken = getCookieValue("accessToken");
  
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  
  export  {axiosConfig};
  