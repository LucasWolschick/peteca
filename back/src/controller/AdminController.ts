import { Router, Request, Response } from "express";
import { ServiceManager } from "../service/ServiceManager";
import { query } from "express-validator";
import { checkAuthenticated } from "./UserController";
import { validateInput } from "../validateInput";
import { ForbiddenError } from "../errors";

const adminService = ServiceManager.getAdminService();
const permissionsService = ServiceManager.getPermissionsService();

const router = Router();

const logsValidator = [
  query("from").optional().isISO8601().toDate(),
  query("to").optional().isISO8601().toDate(),
  query("limit").optional().toInt(),
  query("level").optional().isIn(["debug", "info", "warn", "error"]),
];

// get logs from a timestamp range
// range is optional and inclusive
router.get(
  "/logs",
  logsValidator,
  async (req: Request, res: Response, next) => {
    try {
      const user = checkAuthenticated(req);

      if (!(await permissionsService.userHasPermission(user.id, "admin"))) {
        throw new ForbiddenError(
          "Você não tem permissão para acessar este recurso."
        );
      }

      validateInput(req);
      const { from, to, limit, level } = req.query;

      const logs = await adminService.getLogs(
        from as any,
        to as any,
        limit as any,
        level as any
      );
      res.status(200).json(logs);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
