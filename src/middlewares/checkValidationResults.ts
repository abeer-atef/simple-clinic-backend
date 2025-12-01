import { RequestHandler } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const checkValidationResults: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new CustomValidationError(errors));
  }

  next();
};

export class CustomValidationError extends Error {
  constructor(private errors: Result<ValidationError>) {
    super();
  }

  getErrors(): Record<string, string[]> {
    const errorMap: Record<string, string[]> = {};

    this.errors.array().forEach((err:any) => {
      if (!errorMap[err["path"]]) {
        errorMap[err["path"]] = [];
      }
      errorMap[err["path"]].push(err.msg);
    });

    return errorMap;
  }
}
