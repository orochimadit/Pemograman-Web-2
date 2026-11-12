import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Payload yang dikirim tidak sesuai kontrak skema",
            details: error.errors.map((err) => ({
              field: err.path.join("."),
              message: err.message
            }))
          }
        });
      }
      return res.status(500).json({
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Kesalahan server internal" }
      });
    }
  };
};

export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: "INVALID_QUERY_PARAMS",
            message: "Parameter query URL tidak valid",
            details: error.errors.map((err) => ({
              field: err.path.join("."),
              message: err.message
            }))
          }
        });
      }
      next(error);
    }
  };
};
