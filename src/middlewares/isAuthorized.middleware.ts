import { RequestHandler } from "express";
import { Role } from "../utils/userRole";

export const isAuthorized = (...roles: Role[]): RequestHandler => {
  return (req, res, next) => {
    if (req.user) {
      console.log(req.user)
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(401).json({ message: "you are Unauthorized , please login" });
    }
  };
};