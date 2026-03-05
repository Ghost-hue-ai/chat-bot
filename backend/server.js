import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dbConnect from "./dbConfig/dbConnect.js";
import express from "express";
import chatRouter from "./routers/chat.router.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/chat", chatRouter);
const PORT = 5000;
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
