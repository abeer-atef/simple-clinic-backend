import { RequestHandler } from "express";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserToken } from "../interfaces/userToken";

dotenv.config();

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const Token = req.cookies.token;

  if (!Token) {
    res.status(401).json({ message: "you are unauthorized , please login" });
    return;
  }

  try {
    req.user = <IUserToken>Jwt.verify(Token, process.env.SECRET_KEY!);

    next();
  } catch (error) {
    res.status(401).json({ message: "you are unauthorized , please login" });
  }
};
