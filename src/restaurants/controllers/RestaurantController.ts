import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorHandler } from "../../utils";
import fs from "fs";
import { ITransaction, TxType } from "../../transaction-history";

// IMPORTANT NOTICE: Restaurant data is taken from here: https://gist.github.com/yoobi55/5d36f13e902a75225a39a8caa5556551
// It only serves as dummy data with no additional purposes or intent.

export const retrieveNearbyRestaurants = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req).array();
    if (errors.length) {
      next(
        new ErrorHandler(
          400,
          "BAD_REQUEST_ERROR",
          JSON.stringify(errors) || "Error"
        )
      );
      return;
    }
    const restaurantsJSONObj = JSON.parse(
      fs.readFileSync("./restaurants.json", "utf8")
    );
    const paramLat = +req.query.lat!.toString();
    const paramLng = +req.query.lng!.toString();
    const restaurantList = restaurantsJSONObj.restaurants as any[];
    const foundNearbyRestaurants = restaurantList.filter((restaurant) => {
      const latlng = restaurant.latlng;
      const lat = latlng.lat as number;
      const lng = latlng.lng as number;
      return (
        paramLat.toFixed(2) === lat.toFixed(2) &&
        paramLng.toFixed(2) === lng.toFixed(2)
      );
    });
    if (foundNearbyRestaurants.length) {
      const newTx: Partial<ITransaction> = {
        madeByLoggedInUser: false,
        userName: req.user.givenNames,
        txType: TxType.NEARBY_RESTAURANTS,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      res.locals.tx = newTx;
      res.locals.response = {
        status: 200,
        jsonObject: foundNearbyRestaurants,
      };
      next();
      return;
    }
    next(new ErrorHandler(404, "NOT_FOUND_ERROR", "No restaurants found."));
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};
