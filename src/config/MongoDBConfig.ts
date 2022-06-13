import mongoose from "mongoose";
import { UserModel } from "../users";
import { TransactionModel } from "../transaction-history";
import { RestaurantModel } from "../restaurants";

let database: mongoose.Connection;

export const connectToMongo = () => {
  // Add your own uri below, here my dbname is UserDB
  // and we are using the local mongodb
  const uri = process.env.MONGO_URI!;

  if (database) {
    return;
  }
  // In order to fix all the deprecation warnings,
  // below are needed while connecting
  mongoose.connect(uri, {
    dbName: process.env.MONGO_DB_NAME,
    auth: {
      username: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    },
    authSource: "admin",
  });

  database = mongoose.connection;
  // When mentioned database is available and successfully connects
  database.once("open", async () => {
    console.log("Connected to database successfully");
  });

  // In case of any error
  database.on("error", () => {
    console.log(`Error connecting to database. Check Whether mongoDB
        installed or you can try to give opensource Mongo Atlas database`);
  });

  return {
    UserModel,
    RestaurantModel,
    TransactionModel,
  };
};

// Safer way to get disconnected
export const disconnectFromMongo = () => {
  if (!database) {
    return;
  }

  mongoose.disconnect();
};
