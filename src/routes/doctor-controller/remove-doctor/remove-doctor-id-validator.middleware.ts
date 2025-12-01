import { RequestHandler } from "express";
import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import { RemoveDoctorRequest } from "./remove-doctor.dto";
import { ApiHandler } from "../../../interfaces/api-handler";


export const removeDoctorIdValidator = [
  body("id").notEmpty().withMessage("id is required"),
];

export const checkDoctorObjectIdFromBody:  ApiHandler<RemoveDoctorRequest> = (req, res, next) => {
  const id = req.body.id;

  if (!id) {
    return res.status(400).json({

      errors: {
        id: [ "ID is required"],
      },
    });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({

      errors: {
        id: ["Invalid ID format"],
      },
    });
  }

  next();
};