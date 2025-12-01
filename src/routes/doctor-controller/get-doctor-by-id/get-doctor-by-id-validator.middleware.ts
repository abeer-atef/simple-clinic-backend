import { RequestHandler } from "express";
import { query } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ApiHandler } from "../../../interfaces/api-handler";
import { DoctorDetailsResponse } from "./get-doctor-by-id.dto";

export const getDoctorIdValidator = [
  query("id").isEmpty().withMessage("id is required"),
];

export const checkDoctorObjectIdFromParam: ApiHandler<
  {},
  DoctorDetailsResponse,
  {},
  { id: string }
>  = (req, res, next) => {
  const id = req.params.id;

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
