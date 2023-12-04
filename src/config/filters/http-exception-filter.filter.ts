import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { IResponseError } from '../interfaces/response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal Server Error';
    let stack = "";
    if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    response.status(status).json(<IResponseError>{
      code: status,
      status: 'error',
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
