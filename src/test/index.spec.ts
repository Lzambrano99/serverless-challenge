import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { EmployeeRepository } from '../infraestructure/database/employee.repository';
import { v4 } from 'uuid';
import { IResponseSuccess } from 'src/config/interfaces/response.interface';

jest.mock('../infraestructure/database/employee.repository.ts');


describe('EmployeeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/employees/createEmployee (POST)', async () => {
    const repository: EmployeeRepository = new EmployeeRepository();

    const repositoryMock = EmployeeRepository as jest.MockedClass<typeof EmployeeRepository>;
    
    const createdObject = { 
      Id: v4(),
      Name: "Luis Baque",
      Age: 40,
      JobTitle: "senior developer",
    }

    repositoryMock.prototype.create.mockResolvedValue(
      Promise.resolve(createdObject)
    );

    const response = await request(app.getHttpServer())
      .post('/employees/createEmployee')
      .send(createdObject)
      .expect(201);

    expect(response.body).toEqual(<IResponseSuccess> { code: 200, status: "success", data: createdObject });
  });

  it('/employees/getAllEmployees (GET)', async () => {

    const repositoryMock = EmployeeRepository as jest.MockedClass<typeof EmployeeRepository>;
    const getAllObject = [
      { 
        Id: v4(),
        Name: "Luis Baque",
        Age: 40,
        JobTitle: "senior developer",
      },
      { 
        Id: v4(),
        Name: "Luis Zambrano",
        Age: 20,
        JobTitle: "Jr developer",
      }
    ]

    repositoryMock.prototype.getAll.mockResolvedValue(
      Promise.resolve(getAllObject)
    );

    const response = await request(app.getHttpServer())
      .get('/employees/getAllEmployees')
      .expect(200);

    expect(response.body).toEqual(<IResponseSuccess> { code: 200, status: "success", data: getAllObject })
  });

  it('/employees/getEmployeeById/:id (GET)', async () => {

    const repositoryMock = EmployeeRepository as jest.MockedClass<typeof EmployeeRepository>;
    const getByIdObject = { 
      Id: v4(),
      Name: "Luis Baque",
      Age: 40,
      JobTitle: "senior developer",
    };

    repositoryMock.prototype.getById.mockResolvedValue(
      Promise.resolve( getByIdObject )
    );

    const response = await request(app.getHttpServer())
      .get('/employees/getEmployeeById/1')
      .expect(200);

    expect(response.body).toEqual(<IResponseSuccess> { code: 200, status: "success", data: getByIdObject })
  });

  it('/employees/updateEmployee/:id (PUT)', async () => {

    const repositoryMock = EmployeeRepository as jest.MockedClass<typeof EmployeeRepository>;
    const getUpdateObject = { 
      Id: v4(),
      Name: "Luis Baque",
      Age: 40,
      JobTitle: "senior developer",
    };
    repositoryMock.prototype.update.mockResolvedValue(
      Promise.resolve(getUpdateObject)
    );

    const response = await request(app.getHttpServer())
      .put('/employees/updateEmployee/1')
      .expect(200);

    expect(response.body).toEqual(<IResponseSuccess> { code: 200, status: "success", data: getUpdateObject })
  });

  it('/employees/deleteEmployee/:id (PUT)', async () => {

    const repositoryMock = EmployeeRepository as jest.MockedClass<typeof EmployeeRepository>;
    
    repositoryMock.prototype.delete.mockResolvedValue(
      Promise.resolve( true )
    );

    const response = await request(app.getHttpServer())
      .delete('/employees/deleteEmployee/1')
      .expect(200);
    
    expect(response.body).toEqual(<IResponseSuccess> { code: 200, status: "success", data: true })
  });
});