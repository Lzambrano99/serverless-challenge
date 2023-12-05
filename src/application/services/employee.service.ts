import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeRepository } from '../../infraestructure/database/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createEmployee(name: string, age: number, jobTitle: string): Promise< EmployeeEntity | undefined > {
    const employee = new EmployeeEntity(uuidv4(), name, age, jobTitle);
    return await this.employeeRepository.create(employee);
  }

  async getEmployeeById(id: string): Promise<EmployeeEntity | undefined> {
    return await this.employeeRepository.getById(id);
  }

  async updateEmployee(employee: EmployeeEntity): Promise<EmployeeEntity | undefined> {
    return await this.employeeRepository.update(employee);
  }

  async deleteEmployee(id: string): Promise<boolean> {
    return await this.employeeRepository.delete(id);
  }

  async getAllEmployees(): Promise<EmployeeEntity[]>  {
    return await this.employeeRepository.getAll();
  }
}
