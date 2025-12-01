import { body } from "express-validator";
import { enGender } from "../../../utils/user-gender";

export const addDoctorValidationChain = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("dateOfBirth")
    .exists().withMessage("dateOfBirth is required")
    .isISO8601().withMessage("dateOfBirth must be a valid date")
    .custom((value) => {
      const date = new Date(value);
      const minDate = new Date("1980-01-01");
      const maxDate = new Date("2000-12-31");

      if (date < minDate || date > maxDate) {
        throw new Error("dateOfBirth must be between 1980-01-01 and 2000-12-31");
      }
      return true;
    }),
  body("gender")
    .isIn([enGender.MALE, enGender.FEMALE])
    .withMessage("Gender must be male or female"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
    body("specialization")
    .notEmpty()
    .withMessage("specialization is required "),
];
