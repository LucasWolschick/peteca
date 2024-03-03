import * as express from "express";
import * as cors from "cors";
import passswordResetRoutes from "./controller/passwordResetRoutes";
import usuarioController from "./controller/UsuarioController";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const PORT = 8080;

// Base
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Rotas para redefinicao de senhaq
app.use("/resetpassword", passswordResetRoutes);
app.use("/usuario", usuarioController);

// Middleware para recuperação de erros
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send(err.message);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
