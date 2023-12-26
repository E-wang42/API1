import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { error } from "console";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const PORT: number | string = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT, (): void => {
  console.log(`***SERVER RUNNING ON PORT ${PORT}***`);
});

const MONGO_URL = "mongodb://localhost:27017";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("eRRor", (error: Error) => console.log(error));