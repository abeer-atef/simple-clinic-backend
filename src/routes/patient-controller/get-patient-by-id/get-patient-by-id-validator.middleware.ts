import { RequestHandler } from "express";
import { query } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ApiHandler } from "../../../interfaces/api-handler";
import { GetPatientByIdResponse } from "./get-patient-format.dto";

export const getPatientIdValidator = [
  query("id").isEmpty().withMessage("id is required"),
];

export const checkPatientObjectIdFromParam: ApiHandler<
  {},
  GetPatientByIdResponse,
  {},
  { id: string }
> = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "Validation error",
      errors: {
        id: ["Patient ID is required in route parameters."],
      },
    });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "Validation error",
      errors: {
        id: ["Invalid Id format."],
      },
    });
  }
  next();
};
