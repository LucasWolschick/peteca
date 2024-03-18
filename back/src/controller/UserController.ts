import * as express from "express";
import { UserService } from "../service/UserService";
import { body, param } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import { UnauthorizedError } from "../errors";
import { ServiceManager } from "../service/ServiceManager";
import { authMiddleware } from "../authMiddleware";
import { validateInput } from "../validateInput";

const userService = ServiceManager.getUserService();
const permissionsService = ServiceManager.getPermissionsService();

const router = express.Router();

const cadastroValidator = [
  body("nome").notEmpty(),
  body("ra").optional().notEmpty(),
  body("matricula").optional({ checkFalsy: true }),
  body("email").isEmail(),
  body("senha").notEmpty(),
  body("aniversario").optional().isISO8601(),
];

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

router.post("/register", cadastroValidator, async (req, res, next) => {
  try {
    validateInput(req);
    const creator = checkAuthenticated(req);
    if (
      !(await permissionsService.userHasPermission(
        creator.id,
        "Gerir Cadastros"
      ))
    ) {
      throw new UnauthorizedError(
        "Você não tem permissão para criar cadastros"
      );
    }

    const user: Omit<User, "id"> = {
      nome: req.body.nome,
      ra: req.body.ra,
      matricula: req.body.matricula,
      email: req.body.email,
      senha: req.body.senha,
      data_nascimento: new Date(req.body.aniversario || "2000-01-01"),

      ingresso: new Date(),
      verificado: false,
      ativo: true,
      imagem: "",
      senha_removida: true,
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
      const { user, token } = await userService.loginAndRedirect(
        email,
        password,
        remember
      );

      if (user.senha_removida) {
        await userService.resetPasswordRequest(email);
        res.json({
        message: "Solicitação de redefinição de senha enviada com sucesso",
      });
      } else {
        const permissions = await permissionsService.getUserPermissions(user.id);
        res.json({ user, token, permissions });
      }
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = checkAuthenticated(req);
      await userService.logout(user);
      res.json({ message: "Usuário deslogado com sucesso" });
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
  [param("token").notEmpty(), body("senha").notEmpty()],
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
      res.json({
        message: "Solicitação de redefinição de senha enviada com sucesso",
      });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = checkAuthenticated(req);
    const userSemSenha = { ...user, senha: undefined };
    res.json(userSemSenha);
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/:id",
  [param("id").toInt()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateInput(req);
      const { id } = req.params;
      await userService.deleteUser(Number(id));
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:id",
  [param("id").toInt(10)],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateInput(req);
      const user = checkAuthenticated(req);
      const id = parseInt(req.params.id);
      const usuario = await userService.getUserById(id);
      delete usuario.senha;
      res.status(200).json(usuario);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:id",
  [param("id").toInt(10), ...cadastroValidator],
  async (req, res, next) => {
    try {
      validateInput(req);
      const user = checkAuthenticated(req);
      if (
        user.id !== (req.params.id as any) &&
        !(await permissionsService.userHasPermission(
          user.id,
          "Gerir Cadastros"
        ))
      ) {
        throw new UnauthorizedError(
          "Você não tem permissão para acessar este recurso."
        );
      }
      const updatedUser: Partial<User> = {
        nome: req.body.nome,
        ra: req.body.ra,
        matricula: req.body.matricula,
        email: req.body.email,
        senha: req.body.senha,
        data_nascimento: req.body.aniversario,
      };
      await userService.updateUser(req.params.id, updatedUser);
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = checkAuthenticated(req);

    const usuarios = (await userService.getAllUsers()).map((u) => {
      delete u.senha;
      return u;
    });
    res.status(200).json(usuarios);
  } catch (e) {
    next(e);
  }
});

init();

export default router;
