import { NextFunction, Request, Response, Router } from "express";
import { ServiceManager } from "../service/ServiceManager";
import { validateInput } from "../validateInput";
import { checkAuthenticated } from "./UserController";
import { NotFoundError, UnauthorizedError } from "../errors";
import { body, param, query } from "express-validator";
import { TipoTransacao } from "@prisma/client";
import Decimal from "decimal.js";

const router = Router();

const permissionsService = ServiceManager.getPermissionsService();
const transactionService = ServiceManager.getTransactionService();
const accountService = ServiceManager.getAccountService();

const createTransactionValidator = [
  body("valor").isNumeric(),
  body("data").toDate(),
  body("referencia").optional(),
  body("tipo").isIn(["receita", "despesa", "pendencia"]),
  body("conta").isInt(),
];

const updateTransactionValidator = [
  body("id").isInt(),
  body("valor")
    .optional()
    .isDecimal()
    .customSanitizer((value) => new Decimal(value)),
  body("data").optional().toDate(),
  body("referencia").optional(),
  body("tipo").optional().isIn(["receita", "despesa", "pendencia"]),
  body("conta").optional().isInt(),
];

function requireCaixinhaPermission() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      validateInput(req);
      const creator = checkAuthenticated(req);
      if (
        !(await permissionsService.userHasPermission(
          creator.id,
          "Gerir Caixinha"
        ))
      ) {
        throw new UnauthorizedError(
          "Você não tem permissão para alterar transações da caixinha"
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

router.get(
  "/",
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Iniciando GET /transactions...");
      const transactions = await transactionService.getTransactions();
      console.log("Resultado do serviço:", transactions);
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      next(error);
    }
  }
);

router.get(
  "/filter",
  [
    query("from").optional().toDate(),
    query("to").optional().toDate(),
    query("q").optional(),
  ],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, from, to } = req.query;
      const transactions = await transactionService.searchTransactions(
        q as string,
        from as any as Date,
        to as any as Date
      );
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/reports", requireCaixinhaPermission(), async (req, res, next) => {
  try {
    const reports = await transactionService.getReportsInfo();
    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/reports/create",
  [body("from").toDate(), body("to").toDate()],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from, to } = req.body;
      const report = await transactionService.emitReport(
        from,
        to,
        checkAuthenticated(req)
      );

      // redirect to the report using its id /reports/:id
      res.status(201).location(`/api/transactions/reports/${report.id}`);
      res.send(`
        <html>
          <head><title>Recurso Criado</title></head>
          <body>
            <p>Relatório criado com sucesso</p>
            <a href="/api/transactions/reports/${report.id}">Ver relatório</a>
          </body>
        </html>
      `);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/reports/:id",
  [param("id").toInt(10)],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const reports = await transactionService.getFinancialReport(id);
      res.set("Content-Type", "text/html");
      res.send(new TextDecoder().decode(reports.relatorio));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/statements",
  requireCaixinhaPermission(),
  async (req, res, next) => {
    try {
      const statements = await transactionService.getStatementsInfo();
      res.status(200).json(statements);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/statements/create",
  [
    body("from").optional().toDate(),
    body("to").optional().toDate(),
    body("q").optional(),
  ],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, from, to } = req.body;
      const statement = await transactionService.emitStatement(
        q,
        from,
        to,
        checkAuthenticated(req)
      );

      // redirect to the report using its id /statements/:id
      res.status(201).location(`/api/transactions/statements/${statement.id}`);
      res.send(`
        <html>
          <head><title>Recurso Criado</title></head>
          <body>
            <p>Extrato criado com sucesso</p>
            <a href="/api/transactions/statements/${statement.id}">Ver extrato</a>
          </body>
        </html>
      `);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/statements/:id",
  [param("id").toInt(10)],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const statements = await transactionService.getStatement(id);
      res.set("Content-Type", "text/html");
      res.send(new TextDecoder().decode(statements.relatorio));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/create",
  createTransactionValidator,
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conta = await accountService.getAccountById(req.body.conta);
      const { valor, data, referencia } = req.body;
      const tipo =
        req.body.tipo === "receita"
          ? TipoTransacao.RECEITA
          : req.body.tipo === "despesa"
          ? TipoTransacao.DESPESA
          : TipoTransacao.PENDENCIA;
      const newTransaction = await transactionService.createTransaction(
        new Decimal(valor),
        data,
        referencia || "",
        tipo,
        conta,
        checkAuthenticated(req)
      );
      res.status(201).json(newTransaction);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/logs",
  [param("id").toInt(10)],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const logs = await transactionService.getTransactionLogs(id);
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  [param("id").toInt(10)],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const transaction = await transactionService.getTransactionById(id);
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  }
);

// TODO: make these fields optional
router.put(
  "/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("O id deve ser um inteiro válido."),
    ...updateTransactionValidator,
  ],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      console.log("Atualizando transação com id:", id);

      const { valor, data, referencia, tipo, conta } = req.body;
      const updatedTransaction = await transactionService.updateTransaction(
        parseInt(id, 10),
        checkAuthenticated(req),
        {
          valor,
          data,
          referencia,
          tipo,
          conta: conta && (await accountService.getAccountById(conta)),
        }
      );
      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      next(error);
    }
  }
);

router.delete(
  "/:id",
  [param("id").toInt(10)],
  requireCaixinhaPermission(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await transactionService.deleteTransaction(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
