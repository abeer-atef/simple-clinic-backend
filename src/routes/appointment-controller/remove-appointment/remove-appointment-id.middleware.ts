import { RequestHandler } from "express";
import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ApiHandler } from "../../../interfaces/api-handler";


export const idBodyValidator = [
  body("id").notEmpty().withMessage("id is required"),
];

export const checkObjectIdFromBody: ApiHandler<{ id: string }> = (req, res, next) => {
  const id = req.body.id;

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
