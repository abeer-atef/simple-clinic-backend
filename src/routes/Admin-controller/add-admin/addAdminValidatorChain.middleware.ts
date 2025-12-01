import { body } from "express-validator";
import { enGender } from "../../../utils/user-gender";

export const addAdminInputValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("dateOfBirth").isDate().withMessage("Valid date of birth is required"),
  body("gender")
    .isIn([enGender.MALE, enGender.FEMALE])
    .withMessage("Gender must be male or female"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
