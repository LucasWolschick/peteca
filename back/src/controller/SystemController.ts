import express = require("express");
import { ServiceManager } from "../service/ServiceManager";

const permissionsService = ServiceManager.getPermissionsService();

const router = express.Router();

router.get("", async (req, res, next) => {
  try {
    res.status(200).json({
      cor: "azul",
      permissoes: await permissionsService.getAllPermissions(),
    });
  } catch (e) {
    next(e);
  }
});

export default router;
