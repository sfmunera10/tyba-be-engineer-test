import { Router } from "express";
import { validatorArrays } from "../../utils";
import { userSignUp, userSignIn, userSignOut, userSignInRequired } from "../";
import { writeTransactionHistory } from "../../transaction-history";

const UserRoutes = Router();

UserRoutes.post(
  "/signup",
  validatorArrays.userSignUp,
  userSignUp,
  writeTransactionHistory
);
UserRoutes.post(
  "/signin",
  validatorArrays.userSignIn,
  userSignIn,
  writeTransactionHistory
);
UserRoutes.put(
  "/signout",
  userSignInRequired,
  userSignOut,
  writeTransactionHistory
);

export { UserRoutes };
