import express from "express";
import cookieParser from "cookie-parser";
import { orderRouter, cartRouter, productRouter, userRouter } from "./routers/indexRouter.js";
import connect from "./database/database.js";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./middleware/swaggerMiddleware.js";
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 4200;
const app = express();
const v1Router = express.Router(); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());

v1Router.use(cookieParser());  
v1Router.use(express.json());
v1Router.use("/users", userRouter);
v1Router.use("/products", productRouter);
v1Router.use("/cart", cartRouter);
v1Router.use("/order", orderRouter);

app.use('/api/v1', v1Router);

app.get("/", (req, res) => {
  res.send("Hello Jewelry Shop");
});

app.listen(port, async () => {
  await connect();
  console.log(`Port: ${port}`);
});
