import HttpStatusCode from "../constant/HttpStatusCode.js";
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
 
    if (req?.headers?.authorization?.startsWith('Bearer')) {
      const token = req.headers?.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
        if (err) {
          return res.status(HttpStatusCode.BAD_REQUEST).json({
            success: false,
            message: "Invalid access Token",
          });
        }
        console.log(decode);
  
        // Kiểm tra thời gian hết hạn của token
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại (đơn vị giây)
        if (decode.exp && decode.exp < currentTimeInSeconds) {
          return res.status(HttpStatusCode.BAD_REQUEST).json({
            success: false,
            message: "Token has expired",
          });
        }
  
        req.user = decode;
        next();
      });
    } else {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Require authentication",
      });
    }
}

export default checkToken;
