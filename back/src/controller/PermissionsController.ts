import * as express from "express";
import { UserService } from "../service/UserService";
import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { UnauthorizedError, ValidationError } from "../errors";
import { ServiceManager } from "../service/ServiceManager";

const permissionsService = ServiceManager.getPermissionsService();

const router = express.Router();

export function validateInput(req: Request) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError("Erro de validação", errors.array());
  }
}

export function checkAuthenticated(req: any): User {
  if (!req.user) {
    throw new UnauthorizedError("Usuário não autenticado");
  }

  return req.user;
}

router.get("/all", async (req, res, next) => {
  try {
    checkAuthenticated(req);

    const permissions = await permissionsService.getAllPermissions();

    res.json(permissions);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id", param("id").toInt(), async (req, res, next) => {
  try {
    checkAuthenticated(req);

    const permissions = await permissionsService.getUserPermissions(
      req.params.id
    );

    res.json(permissions);
  } catch (error) {
    next(error);
  }
});

export default router;
