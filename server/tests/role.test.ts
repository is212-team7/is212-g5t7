// import SequelizeMock from "sequelize-mock";

// var dbMock = new SequelizeMock();
// Mock the overall database layer (connection etc..)
import { Role } from '../src/lib/models/Role';
import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import { roles } from '../src/routes/roles';
import { sequelize } from '../src/database';

jest.mock('sequelize', () => require('./_mocks/sequelize'));

jest.mock('../src/lib/models/role', () => () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    const roleMockModel = dbMock.define('Role');

    const firstTestObject = roleMockModel.build({
        Role_ID: 1,
        Role_Name: 'Test role #1',
        Role_Description: 'test role desc',
        Role_Deleted: false,
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00',
    });

    // firstTestObject.update = (data) => {
    // 	firstTestObject.isUpdated = true
    // 	firstTestObject.name = data.name
    // 	return Promise.resolve()
    // }

    // firstTestObject.destroy = () => {
    // 	firstTestObject.isDestroyed = true
    // 	return Promise.resolve()
    // }

    const testModelInstances = [
        firstTestObject,
        roleMockModel.build({
            Role_ID: 2,
            Role_Name: 'Test role #2',
            Role_Description: 'test role desc',
            Role_Deleted: false,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00',
        }),
    ];

    // Mock model method overrides for tests below
    roleMockModel.findAll = () => Promise.resolve(testModelInstances);
    roleMockModel.findOne = (id: number) =>
        Promise.resolve(id == 1 ? testModelInstances[0] : null);
    roleMockModel.findByPk = (id: number) =>
        Promise.resolve(id == 1 ? testModelInstances[0] : null);
    roleMockModel.create = (data: any) => {
        testModelInstances.push(data);
        return Promise.resolve();
    };

    // Mock test helper methods
    roleMockModel.mockHelperGetLastCreated = () =>
        testModelInstances[testModelInstances.length - 1];
    roleMockModel.mockHelperIsUpdateCalled = () =>
        testModelInstances[0].isUpdated;
    roleMockModel.mockHelperIsDestroyCalled = () =>
        testModelInstances[0].isDestroyed;

    return roleMockModel;
});

// describe("Test Sequelize Mocking", () => {
// 	it("Should get value from mock", async () => {
// 	  const role = await Role.findOne();
// 	  expect(role).not.toBeNull();
// 	  if (role != null) {
// 		  expect(role.Role_Description).toEqual('test role desc');
// 	  }
// 	})
// })

describe('Holidays endpoints', () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(roles);

    // Get list endpoint tests: POST /holidays/:id
    it('GET /roles (list) should return code:0 and array of roles', async () => {
        const res = await request(app)
            .get('/roles')
            .expect('Content-Type', /json/)
            .expect(200);
        // console.log(res.body)
        expect(res.body.code).toEqual(0);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toEqual(2);
    });
});

// describe('role', () => {
//     beforeEach(() =>{
//         jest.resetAllMocks();
//     });

//     describe('Role.__getBookDetail', () => {
//         it('should return book detail', async () => {
//             //arrange
//             const bookID = 1;
//             const mockResponse = {
//                 id: 1,
//                 title: 'ABC',
//                 author: 'John Doe',
//                 page: 1
//             };

//             Role.getBookDetail = jest.fn().mockResolvedValue(mockResponse);

//             //act
//             const result = await BookService.getBookDetail(bookID);

//             //assert
//             expect(result).toEqual(mockResponse);
//             expect(Role.getBookDetail).toHaveBeenCalledTimes(1);
//             expect(Role.getBookDetail).toBeCalledWith(bookID);
//         });
//     });
// });
