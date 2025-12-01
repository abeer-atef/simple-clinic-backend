import express from "express";
import { registerValidationChain } from "./register-validation-chain.middleware";
import { checkValidationResults } from "../../middlewares/checkValidationResults";
import { login, Logout, register } from "./auth";
import { checkEmailVerification } from "./checkEmailVerification";
const authRouter = express.Router();

authRouter.post(
  "/register",
  registerValidationChain,
  checkValidationResults,
  register
);

authRouter.post("/login", login);
authRouter.get("/logout", Logout);

authRouter.get("/verify/:email/:token", checkEmailVerification);

export{authRouter}
