import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorHandler } from "../../utils";
import { ITransaction, TransactionModel, TxType } from "../";

export const retrieveTransactionHistory = async (
  req: Request,
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
    const foundTransactions = await TransactionModel.find({}).sort({
      updatedAt: "desc",
    });
    if (foundTransactions.length) {
      const newTx: Partial<ITransaction> = {
        madeByLoggedInUser: false,
        txType: TxType.TRANSACTION_HISTORY,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      res.locals.tx = newTx;
      res.locals.response = {
        status: 200,
        jsonObject: foundTransactions,
      };
      next();
      return;
    }
    next(new ErrorHandler(404, "NOT_FOUND_ERROR", "No transactions found."));
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};

export const writeTransactionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resLocalsTx: Partial<ITransaction> = res.locals.tx;
    const resLocalsResponse: {
      status: number;
      jsonObject: any;
    } = res.locals.response;
    const newTx = await TransactionModel.create({
      ...resLocalsTx,
    });
    res
      .status(resLocalsResponse.status)
      .json({ tx: newTx, data: resLocalsResponse.jsonObject });
  } catch (error: any) {
    next();
  }
};
