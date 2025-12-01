import { RequestHandler } from "express";
import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ApiHandler } from "../../../interfaces/api-handler";

interface IResponse{id:string}
interface IRequest{id:string}

export const removeAdminIdValidator = [
  body("id").notEmpty().withMessage("id is required"),
];

export const checkAdminObjectIdFromBody:  ApiHandler<IRequest, IResponse> = (req, res, next) => {
  const id = req.body.id ;
  if (!id) {
  return res.status(400).json( {errors:{error:["id is required "]}});
  }
  if (!isValidObjectId(id)) {
  return res.status(400).json( {errors:{error:["invalid id "]}});
  }
  next();
};