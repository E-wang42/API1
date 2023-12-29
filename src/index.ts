import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));

const PORT: number | string = process.env.PORT || 8080;
const server = http.createServer(app);
const MONGO_URL = "mongodb://127.0.0.1:27017/api1";

mongoose.Promise = Promise;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (err) {
    console.error(err);
  }
}
connectDB();

mongoose.connection.on("connected", () => console.log("--DB Connected--"));
mongoose.connection.on("error", (err: Error) =>
  console.error("DB connection error:", err)
);
mongoose.connection.on("disconnected", () => console.log("DB disconnected"));
server.listen(PORT, (): void => {
  console.log(`***SERVER RUNNING ON PORT ${PORT}***`);
});

app.use("/", router());
