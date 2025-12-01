import { query } from "express-validator";
import { isValidObjectId } from "mongoose";
import { ApiHandler } from "../../../interfaces/api-handler";

export const getAdminIdValidator = [
  query("id").isEmpty().withMessage("id is required"),
];

interface IResponse{id:string}
interface Params{id:string}

export const checkAdminObjectIdFromParam:  ApiHandler<{}, IResponse, {},Params> = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
  return res.status(400).json( {errors:{error:["id is required "]}});
  }
  if (!isValidObjectId(id)) {
  return res.status(400).json( {errors:{error:["invalid id "]}});
  }
  next();
};