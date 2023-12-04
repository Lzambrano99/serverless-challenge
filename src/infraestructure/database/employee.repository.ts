import { Injectable } from '@nestjs/common';
import  * as aws  from 'aws-sdk';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { IEmployeeRepository } from 'src/domain/repositories/employee.repository.interface';
@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private readonly tableName = 'EmployeeTable';
  private readonly documentClient: aws.DynamoDB.DocumentClient;

  constructor() {
    this.documentClient = new aws.DynamoDB.DocumentClient();
  }

  async create(employee: EmployeeEntity): Promise<EmployeeEntity | undefined> {
    try {
      await this.documentClient.put({
        TableName: this.tableName,
        Item: employee,
      }).promise();
    } catch (error) {
      throw new Error('No se pudo crear el empleado.');
    }

    return employee;
  }

  async getById(id: string): Promise<EmployeeEntity | undefined> {
    try {
      const result = await this.documentClient.get({
        TableName: this.tableName,
        Key: { Id: id },
      }).promise();
      return result.Item as EmployeeEntity | undefined;
    } catch (error) {
      throw new Error('No se pudo obtener el empleado por ID.');
    }
  }

  async update(employee: EmployeeEntity): Promise<EmployeeEntity | undefined> {
    console.log(employee)
    try {
      await this.documentClient.update({
        TableName: this.tableName,
        Key: { Id: employee.Id },
        UpdateExpression: 'SET #name = :name, #age = :age, #jobTitle = :jobTitle',
        ExpressionAttributeNames: {
          '#name': 'Name',
          '#age': 'Age',
          '#jobTitle': 'JobTitle',
        },
        ExpressionAttributeValues: {
          ':name': employee.Name,
          ':age': employee.Age,
          ':jobTitle': employee.JobTitle,
        },
      }).promise();
    } catch (error) {
      console.log('No se pudo actualizar el empleado.', error)
      throw new Error('No se pudo actualizar el empleado.');
    }

    return employee;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.documentClient.delete({
        TableName: this.tableName,
        Key: { Id: id },
      }).promise();
    } catch (error) {
      throw new Error('No se pudo eliminar el empleado.');
    }

    return true;
  }

  async getAll(): Promise<EmployeeEntity[]> {
    try {
      const result = await this.documentClient.scan({
        TableName: this.tableName,
      }).promise();
      return result.Items as EmployeeEntity[];
    } catch (error) {
      throw new Error('No se pudieron obtener todos los empleados.');
    }
  }
}