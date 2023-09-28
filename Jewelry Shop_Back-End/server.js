import express from "express";

import * as dotenv from "dotenv";
dotenv.config(); //must have

import { userRouter } from "./routers/indexRouter.js";
import connect from "./database/database.js";
import checkToken from "./middleware/authMiddleware.js";

const app = express();

app.use(checkToken); 

app.use(express.json());

const port = process.env.PORT;

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello Jewelry Shop");
});

app.listen(port ?? 4200, async () => {
  await connect();
  console.log(`Port: ${port}`);
});
