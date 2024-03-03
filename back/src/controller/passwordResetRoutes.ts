import * as express from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../bd/queries";

const router = express.Router();

// Endpoint para solicitar a redefinicao de senha
router.post("/resetpassword", async (req: Request, res: Response, next) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "usuario nao encontrado" });
    }

    const token = jwt.sign({ email }, "mySecretKey", { expiresIn: "1h" });

    res.status(200).json({ message: "Token gerado com sucesso", token });
  } catch (error) {
    console.error("Erro ao buscar usuario por e-mail: ", error);
    next(error);
    //res.status(500).json({ message: 'Erro ao buscar usuario por e-mail' });
  }
});

export default router;
