import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";

import userController from "./controller/UserController";
import permissionsController from "./controller/PermissionsController";
import itemController from "./controller/ItemController"; // Importação do ItemController
import { errorHandler } from "./errors";
import { PermissionsRepository } from "./repository/PermissionsRepository";
import { PrismaClient } from "@prisma/client";

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

// Routers
app.use("/api/user", userController);
app.use("/api/permissions", permissionsController);
app.use("/api/items", itemController); // Rota para os itens

// Gerenciamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
