import express from "express";
import cookieParser from "cookie-parser";
import {
  orderRouter,
  cartRouter,
  productRouter,
  userRouter,
  accountRouter,
  feedbackRouter
} from "./routers/indexRouter.js";
import connect from "./database/database.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./middleware/swaggerMiddleware.js";
import cors from "cors";
import paymentRouter from "./services/vnpayService.js";
import routeUnknown from "./middleware/routeMiddleware.js";

dotenv.config();
const port = process.env.PORT || 4200;
const app = express();
const v1Router = express.Router();
import bodyParser from "body-parser";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const corsOptions = {
  origin: process.env.FRONT_END_ORIGIN_URL,
  credentials: true,
};

app.use(cors(corsOptions));

v1Router.use(cookieParser());
v1Router.use(express.json());
v1Router.use(bodyParser.urlencoded({ extended: false }));
v1Router.use("/account", accountRouter);
v1Router.use("/users", userRouter);
v1Router.use("/products", productRouter);
v1Router.use("/cart", cartRouter);
v1Router.use("/order", orderRouter);
v1Router.use("/payment", paymentRouter);
v1Router.use("/feedback", feedbackRouter);
v1Router.use(routeUnknown);
app.use("/api/v1", v1Router);

app.get("/", (req, res) => {
  res.send("Hello Jewelry Shop");
});

app.listen(port, async () => {
  await connect();
  console.log(`Port: ${port}`);
});
