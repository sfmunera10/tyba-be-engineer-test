import { model, Schema, Model, Document, Types } from "mongoose";

export enum TxType {
  USER_SIGN_UP = "USER_SIGN_UP",
  USER_SIGN_IN = "USER_SIGN_IN",
  USER_SIGN_OUT = "USER_SIGN_OUT",
  NEARBY_RESTAURANTS = "NEARBY_RESTAURANTS",
  TRANSACTION_HISTORY = "TRANSACTION_HISTORY",
}

export interface ITransaction extends Document {
  madeByLoggedInUser: boolean;
  loggedInUserName?: string;
  txType: TxType;
  createdAt: string;
  updatedAt: string;
}

const TransactionSchema: Schema = new Schema({
  madeByLoggedInUser: {
    required: true,
    type: Boolean,
  },
  loggedInUserName: {
    default: "-",
    required: false,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  txType: {
    type: String,
    required: true,
    enum: Object.values(TxType),
  },
  createdAt: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  updatedAt: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
});

const TransactionModel: Model<ITransaction> = model(
  "TransactionModel",
  TransactionSchema
);

export { TransactionModel };
