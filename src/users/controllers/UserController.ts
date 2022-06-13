import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorHandler } from "../../utils";
import { IUser, UserModel } from "../";
import bcrypt from "bcrypt";
import { ITransaction, TxType } from "../../transaction-history";
import jwt from "jsonwebtoken";

export const userSignUp = async (
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
    const bodyRequest: Partial<IUser> = req.body;
    bodyRequest.password = bcrypt.hashSync(bodyRequest.password!, 10);
    const newUser = await UserModel.create({
      ...bodyRequest,
    });
    const newTx: Partial<ITransaction> = {
      madeByLoggedInUser: false,
      userName: newUser.givenNames,
      txType: TxType.USER_SIGN_UP,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    res.locals.tx = newTx;
    res.locals.response = {
      status: 201,
      jsonObject: newUser,
    };
    next();
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};

export const userSignIn = async (
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
    const bodyRequest: Partial<IUser> = req.body;
    let foundUser:
      | (IUser & {
          _id: any;
        })
      | null = null;
    if (bodyRequest.email) {
      foundUser = await UserModel.findOne({ email: bodyRequest.email });
    } else if (bodyRequest.phoneNumber) {
      foundUser = await UserModel.findOne({ email: bodyRequest.phoneNumber });
    }
    if (
      !foundUser ||
      comparePassword(bodyRequest.password!, foundUser.password)
    ) {
      next(
        new ErrorHandler(
          401,
          "NOT_FOUND_ERROR",
          "Authentication failed. Invalid user or password."
        )
      );
      return;
    }
    const newTx: Partial<ITransaction> = {
      madeByLoggedInUser: true,
      userName: foundUser.givenNames,
      txType: TxType.USER_SIGN_IN,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    res.locals.tx = newTx;
    res.locals.response = {
      status: 201,
      jsonObject: jwt.sign(
        {
          phoneNumber: foundUser.phoneNumber,
          givenNames: foundUser.givenNames,
          countryCode: foundUser.countryCode,
          _id: foundUser._id,
        },
        process.env.JWT_SIGN_SECRET!
      ),
    };
    next();
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};

const comparePassword = (bodyRequestPassword: string, userPassword: string) => {
  return bcrypt.compareSync(bodyRequestPassword, userPassword);
};

export const userSignInRequired = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

export const userSignOut = async (
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
    const newTx: Partial<ITransaction> = {
      madeByLoggedInUser: true,
      userName: req.user.givenNames,
      txType: TxType.USER_SIGN_OUT,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    res.locals.tx = newTx;
    res.locals.response = {
      status: 201,
      jsonObject: "Successfully signed out.",
    };
    next();
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};
