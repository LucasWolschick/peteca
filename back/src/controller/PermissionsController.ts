import * as express from "express";
import { UserService } from "../service/UserService";
import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { UnauthorizedError, ValidationError } from "../errors";
import { ServiceManager } from "../service/ServiceManager";
import { validateInput } from "../validateInput";

const permissionsService = ServiceManager.getPermissionsService();

const router = express.Router();

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
    validateInput(req);

    checkAuthenticated(req);

    const permissions = await permissionsService.getUserPermissions(
      req.params.id
    );

    res.json(permissions);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/user/:id",
  [param("id").toInt(), body("permissions").exists()],
  async (req, res, next) => {
    try {
      validateInput(req);

      // assert that req.body.permissions is a list, and it is a list of strings
      if (
        !Array.isArray(req.body.permissions) ||
        req.body.permissions.some((x: any) => typeof x !== "string")
      ) {
        throw new ValidationError("permissions must be a string list", [
          "permissions",
        ]);
      }

      const id: number = req.params.id;

      const allPermissions = await permissionsService.getAllPermissions();

      const user = checkAuthenticated(req);
      if (
        !(await permissionsService.userHasPermission(
          user.id,
          "Gerir Cadastros"
        )) ||
        user.id === id
      ) {
        throw new UnauthorizedError(
          "Você não tem permissão para atualizar as permissões deste usuário"
        );
      }

      const otherUserPerms = await permissionsService.getUserPermissions(id);

      // deduplicate and filter out invalid permissions
      const newPerms: string[] = Array.from(new Set(req.body.permissions));
      const validPerms = newPerms.filter((x) => allPermissions.includes(x));

      await permissionsService.setUserPermissions(id, validPerms);

      res.status(200).send({ message: "Permissões atualizadas com sucesso" });
    } catch (e) {
      next(e);
    }
  }
);

export default router;
