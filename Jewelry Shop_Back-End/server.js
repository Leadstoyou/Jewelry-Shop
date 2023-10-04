import express from "express";
import * as dotenv from "dotenv";
dotenv.config(); 

import { cartRouter, productRouter, userRouter } from "./routers/indexRouter.js";
import connect from "./database/database.js";

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./middleware/swaggerMiddleware.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT;

const app = express();
const v1Router = express.Router(); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

v1Router.use(cookieParser());  
v1Router.use(express.json());

v1Router.use("/users", userRouter);
v1Router.use("/products", productRouter);
v1Router.use("/cart", cartRouter);
// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use('/api/v1', v1Router);

app.get("/", (req, res) => {
  res.send("Hello Jewelry Shop");
});

app.listen(port ?? 4200, async () => {
  await connect();
  console.log(`Port: ${port}`);
});
