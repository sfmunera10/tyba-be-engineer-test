import dotenv from "dotenv";
import { connectToMongo } from "./config/MongoDBConfig";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import MainRouter from "./routers/MainRouter";
import { ErrorHandler } from "./utils";
import morgan from "morgan";

dotenv.config({});

connectToMongo();

// Create express app
const app = express();

//Use helmet
app.use(helmet());

// parse application/json
app.use(express.json());

// Accept CORS only from React Frontend Client Origin
app.use(cors());

//HTTP Request Logging
app.use(morgan("tiny"));

// make server app handle any route starting with "/api"
app.use("/api", MainRouter);

// Handle Not Found routes
app.use("*", (_: Request, __: Response, next: NextFunction) => {
  next(new ErrorHandler(404, "NOT_FOUND_ERROR", "Resource not found"));
});

// make server app handle any error
app.use((err: ErrorHandler, _: Request, res: Response, __: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    errorCode: err.errorCode,
    statusCode: err.statusCode,
    message: err.errorMessage,
  });
});

// make server listen on some port
const port = process.env.API_REST_PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
