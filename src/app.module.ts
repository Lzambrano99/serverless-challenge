import { Module } from '@nestjs/common';
import { EmployeeController } from './interfaces/controllers/employee.controller';
import { EmployeeUseCase } from './application/use-cases/employee.use-case';
import { EmployeeService } from './application/services/employee.service';
import { EmployeeRepository } from './infraestructure/database/employee.repository';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './config/filters/http-exception-filter.filter';
import { ResponseInterceptor } from './config/response-interceptor/response-interceptor.interceptor';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeUseCase, 
    EmployeeService, 
    EmployeeRepository,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
   
  ],
})
export class AppModule {}
