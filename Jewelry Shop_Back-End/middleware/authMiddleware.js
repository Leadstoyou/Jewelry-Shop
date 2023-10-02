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
