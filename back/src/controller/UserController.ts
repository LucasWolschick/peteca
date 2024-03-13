import * as express from "express";
import { UserService } from "../service/UserService";
import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { UnauthorizedError, ValidationError } from "../errors";
import { ServiceManager } from "../service/ServiceManager";
import { authMiddleware } from "../authMiddleware";

const userService = ServiceManager.getUserService();

const router = express.Router();

const cadastroValidator = [
  body("nome").notEmpty(),
  body("ra").optional().notEmpty(),
  body("matricula").optional({checkFalsy: true}),
  body("email").isEmail(),
  body("senha").notEmpty(),
];

export function validateInput(req: Request) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError("Erro de validação", errors.array());
  }
}

export function checkAuthenticated(req: any): User {
  if (!req.user) {
    throw new UnauthorizedError("Usuário não autenticado");
  }

  return req.user;
}

export function init() {
  // cria conta de administrador no banco de dados caso ela não exista
  userService.createAdmin().then(() => userService.updateAdminPassword());
}

// Middleware that attempts to authenticate the user
router.use(async (req: any, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (typeof token !== "string") {
        throw new UnauthorizedError("Token inválido");
      }
      const user = await userService.authenticate(token);
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next();
  }
});

router.post("/register", cadastroValidator, async (req, res, next) => {
  try {
    validateInput(req);
    const creator = authMiddleware(req, res, next);

    const user: Omit<User, "id"> = {
      nome: req.body.nome,
      ra: req.body.ra,
      matricula: req.body.matricula,
      email: req.body.email,
      senha: req.body.senha,

      ingresso: new Date(),
      verificado: false,
      ativo: true,
      admin: false,
      data_nascimento: new Date(2001, 0, 1),
      imagem: "",
    };

    const createdUser = await userService.register(user);

    res.json({ id: createdUser.id });
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
      validateInput(req);
      const { email, password, remember } = req.body;
      const { user, token } = await userService.loginandredirect(email, password, remember);

      // Redireciona o usuário para a página desejada após o login
      res.json({ user, token, redirect: "/inicio" });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/confirm/:token",
  param("token").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateInput(req);

      const { token } = req.params;
      await userService.activateAccount(token);

      res.json({ message: "Email confirmado com sucesso" });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/resetpassword/:token",
  param("token").notEmpty(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateInput(req);

      const { token } = req.params;
      const { senha } = req.body;

      await userService.resetPassword(token, senha);
      res.json({ message: "Senha redefinida com sucesso" });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/resetpassword",
  body("email").isEmail(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateInput(req);
      const { email } = req.body;
      await userService.resetPasswordRequest(email);
      res.json({ message: "Solicitação de redefinição de senha enviada com sucesso"})
    } catch (e) {
      next(e);
    }
  }
);

router.get("/me",  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = authMiddleware(req, res, next);
    const userSemSenha = { ...user, senha: undefined };
    res.json(userSemSenha);
  } catch (e) {
    next(e);
  }
});

router.delete("/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(Number(id));
    res.status(200).json({message: "Usuário deletado com sucesso"});
  } catch (e) {
    next(e);
  }
}
);

init();

export default router;
