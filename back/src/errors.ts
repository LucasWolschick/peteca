import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
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
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string | undefined) {
    super(message ?? "Forbidden", 403);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string | undefined) {
    super(message ?? "Unauthorized", 401);
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    console.error("[ERROR]", err.message);
    res.status(err.status).json(err.toJson());
  } else {
    console.error("[ERROR]", err.stack);
    res.status(500).send(err.message);
  }
}
