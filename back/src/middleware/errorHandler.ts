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
