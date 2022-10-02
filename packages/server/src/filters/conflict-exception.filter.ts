import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
  public catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(409).json({
      message: {
        statusCode: 409,
        error: 'Conflict',
        message: 'Duplicate entry',
      },
    });
  }
}
