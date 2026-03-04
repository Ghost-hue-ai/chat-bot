import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./dbConfig/dbConnect.js";
import express from "express";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 5000;
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
