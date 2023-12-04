import { EmployeeEntity } from '../entities/employee.entity';

export interface IEmployeeRepository {
  create(employee: EmployeeEntity): Promise<EmployeeEntity | undefined>;
  getById(id: string): Promise<EmployeeEntity | undefined> ;
  update(employee: EmployeeEntity): Promise<EmployeeEntity | undefined>;
  delete(id: string): Promise<boolean>;
  getAll(): Promise<EmployeeEntity[]> ;
}
