import HttpStatusCode from "../constant/HttpStatusCode.js";

const routeUnknown = (req, res, next) => {
  res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Route not found" });
  next();
};

export default routeUnknown;
