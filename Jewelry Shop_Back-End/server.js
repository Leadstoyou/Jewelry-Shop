import express from "express";

import * as dotenv from "dotenv";
dotenv.config(); //must have

import { cartRouter, productRouter, userRouter } from "./routers/indexRouter.js";
import connect from "./database/database.js";
import checkToken from "./middleware/authMiddleware.js";
const port = process.env.PORT;

const app = express();
const v1Router = express.Router(); 


v1Router.use(checkToken); 
v1Router.use(express.json());

v1Router.use("/users", userRouter);
v1Router.use("/products", productRouter);
v1Router.use("/cart", cartRouter);
app.use('/api/v1', v1Router);

app.get("/", (req, res) => {
  res.send("Hello Jewelry Shop");
});

app.listen(port ?? 4200, async () => {
  await connect();
  console.log(`Port: ${port}`);
});
