// authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "./errors";
import { ServiceManager } from "./service/ServiceManager";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (typeof token !== "string") {
        throw new UnauthorizedError("Token inválido");
      }
      const user = await ServiceManager.getUserService().authenticate(token);
      (req as any).user = user;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next(new UnauthorizedError("Usuário não autenticado"));
  }
};
