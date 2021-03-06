import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

//Router Imports
import userRoute from "./routes/userRoute";
import workRoute from "./routes/workRoute";
import todoRoute from "./routes/todoRoute";
import dayRoute from "./routes/dayRoute";

import createError from "http-errors";
import { DB, PORT } from "./config";

const app = express();
const port: number = PORT || 9000;
app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: process.env.FRONTEND }));
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});
app.use("/api/user", userRoute);
app.use("/api/day", dayRoute);
app.use("/api/work", workRoute);
app.use("/api/todo", todoRoute);

app.use(() => {
  const error = createError(404, "Could not find this route");
  throw error;
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error.message, error.statusCode);
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "An Unknown error occured" });
};

app.use(errorHandler);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to db");
    app.listen(port, () => {
      console.log(`Listening On Port ${port}`);
    });
  })
  .catch(() => {
    throw createError(501, "Unable to connect database");
  });
