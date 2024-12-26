import { NextFunction, Request, Response, Router } from "express";
import { ItemService } from "../service/ItemService";
import { ServiceManager } from "../service/ServiceManager";
import { checkAuthenticated } from "./UserController";
import { validateInput } from "../validateInput";
import { ForbiddenError } from "../errors";
import { query } from "express-validator";

const itemService = ServiceManager.getItemService();
const permissionsService = ServiceManager.getPermissionsService();

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = checkAuthenticated(req);

    if (
      !(await permissionsService.userHasPermission(user.id, "Gerir Estoque"))
    ) {
      throw new ForbiddenError(
        "Você não tem permissão para acessar este recurso."
      );
    }
    const items = await itemService.getItems();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/update-multiple",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = checkAuthenticated(req);
      if (
        !(await permissionsService.userHasPermission(user.id, "Gerir Estoque"))
      ) {
        throw new ForbiddenError(
          "Você não tem permissão para acessar este recurso."
        );
      }
      const itemsToUpdate = req.body;
      await itemService.updateItems(itemsToUpdate, user);
      res.status(200).json({ message: "Itens atualizados com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = checkAuthenticated(req);
      if (
        !(await permissionsService.userHasPermission(user.id, "Gerir Estoque"))
      ) {
        throw new ForbiddenError(
          "Você não tem permissão para acessar este recurso."
        );
      }
      const searchParams = req.query;
      const items = await itemService.searchItems(searchParams);
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = checkAuthenticated(req);
      if (
        !(await permissionsService.userHasPermission(user.id, "Gerir Estoque"))
      ) {
        throw new ForbiddenError(
          "Você não tem permissão para acessar este recurso."
        );
      }
      const { nome, quantidade, unidadeMedida, local } = req.body;
      const newItem = await itemService.createItem(
        nome,
        quantidade,
        unidadeMedida,
        local,
        user
      );
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

const verifyLogs = [
  query("from").optional().isISO8601().toDate(),
  query("to").optional().isISO8601().toDate(),
];

router.get(
  "/logs",
  verifyLogs,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = checkAuthenticated(req);

      if (
        !(await permissionsService.userHasPermission(user.id, "Gerir Estoque"))
      ) {
        throw new ForbiddenError(
          "Você não tem permissão para acessar este recurso."
        );
      }

      validateInput(req);
      const { from, to } = req.query;

      const logs = await itemService.getLogs(from as any, to as any);
      res.status(200).json(logs);
    } catch (e) {
      next(e);
    }
  }
);

// Get items pelo id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = checkAuthenticated(req);
    if (
      !(await permissionsService.userHasPermission(user.id, "Gerir Estoque"))
    ) {
      throw new ForbiddenError(
        "Você não tem permissão para acessar este recurso."
      );
    }
    const id = parseInt(req.params.id);
    const item = await itemService.getItemById(id);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

// Delete item pelo id
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = checkAuthenticated(req);
      if (
        !(await permissionsService.userHasPermission(user.id, "Gerir Estoque"))
      ) {
        throw new ForbiddenError(
          "Você não tem permissão para acessar este recurso."
        );
      }
      const id = parseInt(req.params.id);
      await itemService.deleteItem(id, user);
      res.status(200).json({ message: "Item deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
