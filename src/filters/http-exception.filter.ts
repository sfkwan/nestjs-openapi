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

    const errorResponse: CommonExceptionDto = {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    };

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      console.log(res);

      if (typeof res === 'object' && res !== null) {
        errorResponse.error = { ...errorResponse.error, ...res };
      } else if (typeof res === 'string') {
        errorResponse.error.message = res;
      }
    } else if (exception instanceof Error) {
      errorResponse.error.message = exception.message;
    }

    response.status(status).json(errorResponse);
  }
}
