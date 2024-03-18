import { Router, Request, Response } from "express";
import { ServiceManager } from "../service/ServiceManager";
import { query } from "express-validator";
import { checkAuthenticated } from "./UserController";
import { validateInput } from "../validateInput";
import { ForbiddenError } from "../errors";
const multer = require('multer');

const adminService = ServiceManager.getAdminService();
const permissionsService = ServiceManager.getPermissionsService();
const upload = multer({ dest: 'uploads/' });

const router = Router();

declare module 'express-serve-static-core' {
  interface Request {
     file: {
       path: string;
     };
  }
 }

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

router.post(
  "/do-backup", async (req: Request, res: Response) => {
  try {
      const user = checkAuthenticated(req);

      if (!(await permissionsService.userHasPermission(user.id, "admin"))) {
        throw new ForbiddenError(
          "Você não tem permissão para acessar este recurso."
        );
      }

      validateInput(req);

      await adminService.performBackup();
      res.status(200).json({ message: 'Backup realizado com sucesso!'});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.post(
 "/import-backup",
 upload.single('backupFile'),
 async (req: Request, res: Response) => {
    try {
      const user = checkAuthenticated(req);

      if (!(await permissionsService.userHasPermission(user.id, "admin"))) {
        throw new ForbiddenError(
          "Você não tem permissão para acessar este recurso."
        );
      }

      validateInput(req);

      const backupPath = req.file.path;
      await adminService.performImport(backupPath);
      res.status(200).json({ message: 'Importação do backup realizada com sucesso!'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});


export default router;
