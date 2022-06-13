import { Router } from "express";
import { RestaurantRoutes } from "../restaurants";
import { TransactionHistoryRoutes } from "../transaction-history";
import { UserRoutes } from "../users";

const MainRouter = Router();

MainRouter.use("/users", UserRoutes);
MainRouter.use("/restaurants", RestaurantRoutes);
MainRouter.use("/transactions", TransactionHistoryRoutes);

export default MainRouter;
