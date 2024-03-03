import * as express from "express";
import { UserService } from "../service/UserService";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";

const userService = new UserService();

// prefix: /usuario
const router = express.Router();

const cadastroValidator = [
  body("nome").notEmpty(),
  body("ra").optional().notEmpty(),
  body("matricula").optional().notEmpty(),
  body("email").isEmail(),
  body("senha").notEmpty(),
];

router.post("/register", cadastroValidator, async (req, res, next) => {
  try {
    const user: Omit<User, "id"> = {
      nome: req.body.nome,
      ra: req.body.ra,
      matricula: req.body.matricula,
      email: req.body.email,
      senha: req.body.senha,

      ingresso: new Date(),
      verificado: false,
      admin: false,
      data_nascimento: new Date(2001, 0, 1),
      imagem: "",
    };

    const createdUser = await userService.register(user);

    res.json(createdUser);
  } catch (e) {
    next(e);
  }
});

const loginValidator = [
  body("email").trim().isEmail(),
  body("password").notEmpty(),
  body("remember").isBoolean(),
];

router.post(
  "/login",
  loginValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, remember } = req.body;
      const user = await userService.loginToken(email, password, remember);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/resetpassword",
  body("email").isEmail(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    await userService.resetPassword(email);
  }
);

export default router;
