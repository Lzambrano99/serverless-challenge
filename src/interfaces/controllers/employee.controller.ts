import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmployeeUseCase } from '../../application/use-cases/employee.use-case';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeUseCase: EmployeeUseCase) {}

  @Post("createEmployee")
  async createEmployee(@Body() data: { name: string; age: number; jobTitle: string }) {
    return await this.employeeUseCase.createEmployee(data.name, data.age, data.jobTitle);
  }

  @Get('getEmployeeById/:id')
  async getEmployeeById(@Param('id') id: string) {
    return await this.employeeUseCase.getEmployeeById(id);
  }

  @Put('updateEmployee/:id')
  async updateEmployee(@Param('id') id: string, @Body() data: { name: string; age: number; jobTitle: string }) {
    return await this.employeeUseCase.updateEmployee(id, data);
  }

  @Delete('deleteEmployee/:id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeeUseCase.deleteEmployee(id);
  }

  @Get('getAllEmployees')
  async getAllEmployees() {
    return await this.employeeUseCase.getAllEmployees();
  }
}