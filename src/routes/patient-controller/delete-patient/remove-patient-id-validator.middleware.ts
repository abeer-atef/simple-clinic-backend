import { RequestHandler } from "express";
import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ApiHandler } from "../../../interfaces/api-handler";


export const removePatientIdValidator = [
  body("id").notEmpty().withMessage("id is required"),
];

export const checkPatientObjectIdFromBody: ApiHandler<{id:string}> = (req, res, next) => {
const id = req.body.id;

if (!id) {
  return res.status(400).json({
    message: "Validation error",
    errors: {
      id: ["ID is required."],
    },
  });
}

if (!isValidObjectId(id)) {
  return res.status(400).json({
    message: "Validation error",
    errors: {
      id: ["Invalid Id."],
    },
  });
}

  next();
};