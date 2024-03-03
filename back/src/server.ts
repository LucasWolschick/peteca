import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";

import userController from "./controller/UserController";
import { errorHandler } from "./errors";

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

// Gerenciamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
