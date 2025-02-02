import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  IntrinsicException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal Server Error',
      error:
        exception instanceof HttpException
          ? exception.name
          : 'InternalServerError',
      details:
        exception instanceof HttpException ? exception.getResponse() : {},
    });

    if (!(exception instanceof IntrinsicException)) {
      console.error(exception);
    }
  }
}
