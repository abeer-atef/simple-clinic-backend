import { RequestHandler } from "express";
import { ApiResponse } from "./api-response";

type DefaultResponse = { id: string };

export type ApiHandler<
  Req,
  Res = DefaultResponse,
  Query = {},
  Params = {}
> = RequestHandler<Params, ApiResponse<Res>, Req, Query>;
