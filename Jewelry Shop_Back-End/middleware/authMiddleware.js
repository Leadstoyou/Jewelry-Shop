import HttpStatusCode from "../constant/HttpStatusCode.js";
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
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
};

const checkUser =
  (allowedRoles = [2]) =>
  (req, res, next) => {
    checkToken(req, res, (err) => {
      if (err) {
        return res.status(err.status).json(err.body);
      }

      const userRole = req.user?.userRole;

      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        return res.status(HttpStatusCode.FORBIDDEN).json({
          success: false,
          message: "Permission denied",
        });
      }
    });
  };

export { checkToken, checkUser };
