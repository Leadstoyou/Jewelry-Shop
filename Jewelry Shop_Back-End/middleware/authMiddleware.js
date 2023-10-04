import HttpStatusCode from "../constant/HttpStatusCode.js";
import jwt from "jsonwebtoken";
import { userController } from "../controllers/indexController.js";

const checkToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers?.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decode) => {
      if (err?.name === "JsonWebTokenError") {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Invalid token format",
        });
      } else if (err instanceof jwt.TokenExpiredError) {
        await userController.refreshAccessTokenController(req, res);
      } else if (err) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal Server Error",
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
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
      console.log(req.user);
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
