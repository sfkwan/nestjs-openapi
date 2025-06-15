import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CommonExceptionDto } from '../common/entities/common-exception.entity';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse: CommonExceptionDto = {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null) {
        errorResponse = { ...errorResponse, ...res };
      } else if (typeof res === 'string') {
        errorResponse.message = res;
      }
    } else if (exception instanceof Error) {
      errorResponse.message = exception.message;
    }

    response.status(status).json(errorResponse);
  }
}
