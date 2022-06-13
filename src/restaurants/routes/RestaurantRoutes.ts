import { Router } from "express";
import { validatorArrays } from "../../utils";
import { retrieveNearbyRestaurants } from "../";
import { writeTransactionHistory } from "../../transaction-history";
import { userSignInRequired } from "../../users";

const RestaurantRoutes = Router();

RestaurantRoutes.get(
  "/",
  validatorArrays.retrieveNearbyRestaurants,
  userSignInRequired,
  retrieveNearbyRestaurants,
  writeTransactionHistory
);

export { RestaurantRoutes };
