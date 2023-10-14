import HttpStatusCode from "../constant/HttpStatusCode.js";
import jwt from "jsonwebtoken";
import { userController } from "../controllers/indexController.js";

const checkToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers?.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decode) => {
      if (err?.name === "JsonWebTokenError") {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          status: "ERROR",
          message: "Invalid token format",
        });
      } else if (err instanceof jwt.TokenExpiredError) {
       const lmeo =  await userController.refreshAccessTokenController(req, res, next);
       console.log('typeof lmeo: ',typeof lmeo );
       if(typeof lmeo === 'string') {
        req.headers.authorization = `Bearer ${lmeo}`;
        checkToken(req,res,next)
       }
       if(typeof lmeo === 'undefined') {
        // next();
       }
      } else if (err) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          status: "ERROR",
          message: "Internal Server Error",
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: "ERROR",
      message: "Require authentication",
    });
  }
};

const checkUser =
  (allowedRoles = [2]) =>
  (req, res, next) => {
    checkToken(req, res, (err) => {
      if (err) {
        console.log('error:', err)
        return res.status(err.status).json(err.body);
      }
      const userRole = req.user?.userRole;
      console.log('userRole',userRole)

      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        return res.status(HttpStatusCode.FORBIDDEN).json({
          status: "ERROR",
          message: "Permission denied",
        });
      }
    });
  };

export { checkToken, checkUser };
