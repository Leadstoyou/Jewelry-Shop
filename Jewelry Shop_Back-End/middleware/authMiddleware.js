import HttpStatusCode from "../constant/HttpStatusCode.js";
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  if (
    req.url.toLowerCase().trim() == "/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/register".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/refreshToken".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/logout".toLowerCase().trim()  ||
    req.url.toLowerCase().trim() == "/users/forgotPassword".toLowerCase().trim()  ||
    req.url.toLowerCase().trim() == "/users/verify".toLowerCase().trim()  
  ) {
    next();
    return;
  }
  try {
    const header = req.headers.authorization
    if(!header){
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Can not find token",
      });
    }
    const token = req.headers?.authorization.split(" ")[1];
    const jwtObject = jwt.verify(token, process.env.ACCESS_TOKEN);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Token is expired",
      });
      return;
    } else {
      next();
      return;
    }
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message,
    });
  }
};

export default checkToken;
