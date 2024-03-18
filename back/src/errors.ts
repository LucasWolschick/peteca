import { Request, Response, NextFunction } from "express";
import logger from "./logger";

export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toJson() {
    return {
      message: this.message,
      status: this.status,
    };
  }
}

export class NotFoundError extends AppError {
  constructor(message: string | undefined) {
    super(message ?? "Not found", 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string | undefined) {
    super(message ?? "Forbidden", 403);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string | undefined) {
    super(message ?? "Unauthorized", 401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string | undefined) {
    super(message ?? "Conflict", 409);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string | undefined) {
    super(message ?? "Internal server error", 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class ValidationError extends AppError {
  private errors: any[];

  constructor(message: string | undefined, errors: any[]) {
    super(message ?? "Validation error", 400);
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  override toJson() {
    return {
      ...super.toJson(),
      errors: this.errors,
    };
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    logger.warn(
      `${err.status} - ${err} - ${req.method} ${req.originalUrl} - ${req.ip}`
    );
    res.status(err.status).json(err.toJson());
  } else {
    logger.error(err.stack.toString());
    res.status(500).send(err.message);
  }
}
