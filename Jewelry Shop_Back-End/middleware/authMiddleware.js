import HttpStatusCode from "../constant/HttpStatusCode.js";
import jwt from "jsonwebtoken";
import { userController } from "../controllers/indexController.js";

const checkToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers?.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN,
      async (err, tokenDataDecode) => {
        if (err?.name === "JsonWebTokenError") {
          return res.status(HttpStatusCode.UNAUTHORIZED).json({
            status: "ERROR",
            message: "Invalid Token Format",
          });
        } else if (err instanceof jwt.TokenExpiredError) {
          const refreshAccessToken =
            await userController.refreshAccessTokenController(req, res, next);
          if (typeof refreshAccessToken === "string") {
            console.log("Refresh success!");
            req.headers.authorization = `Bearer ${refreshAccessToken}`;
            checkToken(req, res, next);
          }
          if (typeof refreshAccessToken === "function") {
            refreshAccessToken(req, res, next);
          }
        } else if (err) {
          return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: "ERROR",
            message: "Invalid Token",
          });
        } else {
          req.user = tokenDataDecode;
          next();
        }
      }
    );
  } else {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: "You must be logged in to access this!",
    });
  }
};

const checkPermission =
  (allowedRoles = [2]) =>
  (req, res, next) => {
    checkToken(req, res, (err) => {
      if (err) {
        console.log("error:", err);
        return res.status(err.status).json(err.body);
      }
      const userRole = req.user?.userRole;

      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        return res.status(HttpStatusCode.FORBIDDEN).json({
          status: "ERROR",
          message: "Permission denied!",
        });
      }
    });
  };

const checkUser = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers?.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN,
      async (err, tokenDataDecode) => {
        if (err) {
          next();
          return;
        }

        req.user = tokenDataDecode;
        next();
      }
    );
  } else {
    next();
  }
};

export { checkToken, checkUser ,checkPermission};
