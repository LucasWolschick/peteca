import * as express from "express";
import * as cors from "cors";
import passswordResetRoutes from "./controller/passwordResetRoutes";
import userController from "./controller/UserController";
import { errorHandler } from "./middleware/errorHandler";

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
app.use("/user", userController);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
