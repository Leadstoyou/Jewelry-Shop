import express from "express";

import * as dotenv from "dotenv";
dotenv.config(); //must have

import { userRouter, studentRouter } from "./routers/index.js";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";

const app = express();
app.use(checkToken); 
app.use(express.json());

const port = process.env.PORT;

//routers
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("response from root router");
});

app.listen(port ?? 4200, async () => {
  await connect();
  console.log(`Port: ${port}`);
});
