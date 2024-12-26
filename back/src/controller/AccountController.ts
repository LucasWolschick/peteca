import { NextFunction, Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { validateInput } from "../validateInput";
import { checkAuthenticated } from "./UserController";
import { ServiceManager } from "../service/ServiceManager";
import { UnauthorizedError } from "../errors";
import { User } from "@prisma/client";

const router = Router();

const permissionsService = ServiceManager.getPermissionsService();
const accountService = ServiceManager.getAccountService();

function requireCaixinhaPermission() {
  return async (req: Request, res: Response, next: NextFunction) => {
    validateInput(req);
    const creator = checkAuthenticated(req);
    if (
      !(await permissionsService.userHasPermission(
        creator.id,
        "Gerir Caixinha"
      ))
    ) {
      throw new UnauthorizedError(
        "Você não tem permissão para criar contas na caixinha"
      );
    }
  };
}

router.get(
  "/",
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accounts = accountService.getAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/create",
  [body("nome").notEmpty(), body("descricao").optional()],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome, descricao } = req.body;
      const newAccount = await accountService.createAccount(nome, descricao);
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  [param("id").toInt(10)],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const account = await accountService.getAccountById(id);
      res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  [
    param("id").toInt(10),
    body("nome").optional().notEmpty(),
    body("descricao").optional(),
  ],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const { nome, descricao } = req.body;
      const updatedAccount = await accountService.updateAccount(
        id,
        nome,
        descricao,
        (req as any).autor as User
      );
      res.status(200).json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  [param("id").toInt(10)],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await accountService.deleteAccount(id, (req as any).user as User);
      res.status(200).json({ message: "Conta deletada com sucesso" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
