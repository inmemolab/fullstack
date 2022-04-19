//* Ini Import
import dotenv from "dotenv";
import express, { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import i18n from "i18n";
import apiRouter from "./routes";
import socket from "./socket";
import db from "./models";
//* Ini .env
dotenv.config();
const env = process.env;
//* Ini server
const app: Application = express();
//* Make a server for some aplications
const services = createServer(app);
//* Ini Cors
const corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
//app.use(cors({ origin: env.ORIGIN, credentials: env.CREDENTIALS == "true" }));
//* Add Socket.io service
const io = new Server(services, {
  cors: {
    origin: env.ORIGIN
  }
});
//* Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//* Use morgan
//app.use(morgan(env.LOG_FORMAT, { stream }));
app.use(morgan("dev"));
//* Use Helmet
app.use(helmet());
//* Use
app.use(express.json());
//* Use Cookie
app.use(cookieParser());
//* Routes api and app
app.use(apiRouter);
//* Ini Socket
socket(io);
//* Import Cron Task
import "./crontask";
//* i18n
i18n.configure({
  locales: ["en", "es", "id"],
  defaultLocale: "es",
  extension: ".json",
  directory: path.join("./", "./locales/")
});
i18n.setLocale("es");
//* Sync database
db.sequelize.sync().then(() => {
  //* Set listen for requests
  services.listen(env.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${env.PORT} - ${i18n.__("Success")}`
    );
  });
});
