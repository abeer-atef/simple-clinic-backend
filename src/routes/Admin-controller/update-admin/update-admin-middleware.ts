import { body } from "express-validator";
import { enGender } from "../../../utils/user-gender";

export const updateAdminValidationChain = [
  body("name").optional().isString().withMessage("Name must be a string"),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date in format (YYYY-MM-DD)"),

  body("gender")
    .optional()
    .isIn([enGender.MALE, enGender.FEMALE])
    .withMessage("Gender must be either 'male' or 'female'"),

  body("email").optional().isEmail().withMessage("Email must be valid"),

  body("phoneNumber")
    .optional()
    .notEmpty()
    .withMessage("Phone number must be valid"),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
