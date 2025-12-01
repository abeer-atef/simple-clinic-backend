import jwt from "jsonwebtoken";

import {
  ICheckEmailVerificationParams,
  CheckEmailVerificationResponse,
} from "./check-email-verification.dto";
import { ApiHandler } from "../../interfaces/api-handler";
import { Person } from "../../models/person.model";
import { IUserToken } from "../../interfaces/userToken";

export const checkEmailVerification: ApiHandler<
  {},
  CheckEmailVerificationResponse,
  {},
  ICheckEmailVerificationParams
> = async (req, res) => {
  const { email, token } = req.params;

  const user = await Person.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      errors: {
        email: ["No user exists with this email."],
      },
    });
  }

  const decoded = <IUserToken>jwt.verify(token, process.env.SECRET_KEY!);

  if (decoded.email !== email) {
    return res.status(400).json({
      message: "Token does not match email",
      errors: {
        token: ["Invalid token for this email."],
      },
    });
  }

  if (user.isEmailVerified) {
    return res.status(400).json({
      message: "Email already verified",
      errors: {
        email: ["This email is already verified."],
      },
    });
  }

  user.isEmailVerified = true;
  await user.save();

  return res.status(200).json({
    message: "Email verified successfully",
  });
};
