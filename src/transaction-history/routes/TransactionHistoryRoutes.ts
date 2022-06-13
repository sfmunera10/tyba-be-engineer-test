import { Router } from "express";
import { validatorArrays } from "../../utils";
import { retrieveTransactionHistory, writeTransactionHistory } from "../";

const TransactionHistoryRoutes = Router();

TransactionHistoryRoutes.get(
  "/",
  retrieveTransactionHistory,
  writeTransactionHistory
);

export { TransactionHistoryRoutes };
