import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";

import userController from "./controller/UserController";
import permissionsController from "./controller/PermissionsController";
import itemController from "./controller/ItemController";
import adminController from "./controller/AdminController";
import systemController from "./controller/SystemController";
import accountController from "./controller/AccountController";
import { NotFoundError, errorHandler } from "./errors";
import logger from "./logger";
import { authMiddleware } from "./authMiddleware";

const app = express();
const PORT = 8080;

// Env
dotenv.config();

// Base
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} ${req.ip}`);
  next();
});

// Auth handler
app.use(authMiddleware);

// Routers
app.use("/api/user", userController);
app.use("/api/permissions", permissionsController);
app.use("/api/items", itemController);
app.use("/api/admin", adminController);
app.use("/api/config", systemController);
app.use("/api/accounts", accountController);

// 404 handler
app.use(async (req, res, next) => {
  next(new NotFoundError("Não encontrado"));
});

// Gerenciamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
