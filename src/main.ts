import dotenv from "dotenv";
import { connectToMongo } from "./config/MongoDBConfig";

dotenv.config({});

connectToMongo();