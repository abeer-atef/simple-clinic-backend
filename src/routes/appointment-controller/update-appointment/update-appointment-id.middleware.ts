import { RequestHandler } from "express";
import { query } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ApiHandler } from "../../../interfaces/api-handler";
import { IRequestBody } from "./appointment-request";

export const idParamValidator = [
  query("id").isEmpty().withMessage("id is required"),
];

export const checkObjectIdFromParams: ApiHandler<IRequestBody,{},{},{id:string}> = (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      errors: {
        id: ["id is required"],
      },
    });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      errors: {
        id: ["invalid id"],
      },
    });
  }

  next();
};
