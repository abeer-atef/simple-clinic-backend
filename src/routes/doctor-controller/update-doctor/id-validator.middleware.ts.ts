import { RequestHandler } from "express";
import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ApiHandler } from "../../../interfaces/api-handler";
import { UpdateDoctorInfoRequest } from "./update-doctor.dto";


export const updateDoctorIdValidator = [
  body("id").notEmpty().withMessage("id is required"),
];

export const checkUpdatedDoctorObjectIdFromBody: ApiHandler<UpdateDoctorInfoRequest> = (req, res, next) => {
  const id = req.body.id ;

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