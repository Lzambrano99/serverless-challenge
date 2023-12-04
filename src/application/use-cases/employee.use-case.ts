import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeUseCase {
  constructor(private readonly employeeService: EmployeeService) {}

  async createEmployee(name: string, age: number, jobTitle: string): Promise< EmployeeEntity | undefined > {
    return await this.employeeService.createEmployee(name, age, jobTitle);
  }

  async getEmployeeById(id: string): Promise< EmployeeEntity | undefined > {
    return this.employeeService.getEmployeeById(id);
  }

  async updateEmployee(id:string, data: { name: string; age: number; jobTitle: string }): Promise< EmployeeEntity | undefined > {
    const existingEmployee = await this.employeeService.getEmployeeById(id);
    
    if (existingEmployee) {
      existingEmployee.Name = data.name;
      existingEmployee.Age = data.age;
      existingEmployee.JobTitle = data.jobTitle;
    }
    console.log('use-cases', existingEmployee)
    return await this.employeeService.updateEmployee(existingEmployee);
  }

  async deleteEmployee(id: string): Promise< boolean > {
    return await this.employeeService.deleteEmployee(id);
  }

  async getAllEmployees(): Promise< EmployeeEntity[] > {
    return this.employeeService.getAllEmployees();
  }
}
