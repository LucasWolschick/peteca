import { validationResult } from "express-validator";
import { Request } from "express";
import { ValidationError } from "./errors";

export function validateInput(req: Request) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError("Erro de validação", errors.array());
  }
}
