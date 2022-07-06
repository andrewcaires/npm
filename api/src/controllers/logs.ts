import { Request, Response } from "express";

import { Logs } from "../models";
import { Controller } from "../utils";

const controller = new Controller("logs", Logs);

export const all = async (req: Request, res: Response) => {

  const { source, type } = req.query;

  const where = source && type ? { source, type } : source ? { source } : type ? { type } : {};

  return controller.all({ where })(req, res);
};
