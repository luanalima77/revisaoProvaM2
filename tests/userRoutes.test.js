const request = require('supertest');
const express = require('express');
const userController = require('../controllers/userController');
const userRoutes = require('../routes/userRoutes');

jest.mock('../controllers/userController', () => ({
    getAllUsers: jest.fn((req, res) => res.status(200).json({ test: 'getAllUsers' })),
    getUserById: jest.fn((req, res) => res.status(200).json({ test: 'getUserById', id: req.params.id })),
    createUser: jest.fn((req, res) => res.status(201).json({ test: 'createUser', body: req.body })),
    updateUser: jest.fn((req, res) => res.status(200).json({ test: 'updateUser', id: req.params.id, body: req.body })),
    deleteUser: jest.fn((req, res) => res.status(200).json({ test: 'deleteUser', id: req.params.id }))
}));

describe('User Routes', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/users', userRoutes);

        jest.clearAllMocks();
    });

    describe('GET /users', () => {
        it('should call getAllUsers controller', async () => {
            const response = await request(app).get('/users');

            expect(response.status).toBe(200);
            expect(userController.getAllUsers).toHaveBeenCalledTimes(1);
            expect(response.body).toEqual({ test: 'getAllUsers' });
        });
    });

    describe('GET /users/:id', () => {
        it('should call getUserById controller with the correct ID', async () => {
            const userId = '123';
            const response = await request(app).get(`/users/${userId}`);

            expect(response.status).toBe(200);
            expect(userController.getUserById).toHaveBeenCalledTimes(1);
            expect(response.body).toEqual({ test: 'getUserById', id: userId });
        });
    });

    describe('POST /users', () => {
        it('should call createUser controller with request body', async () => {
            const userData = { name: 'John Doe', email: 'john@example.com' };
            const response = await request(app)
                .post('/users')
                .send(userData)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(201);
            expect(userController.createUser).toHaveBeenCalledTimes(1);
            expect(response.body).toEqual({ test: 'createUser', body: userData });
        });
    });

    describe('PUT /users/:id', () => {
        it('should call updateUser controller with ID and request body', async () => {
            const userId = '123';
            const userData = { name: 'Updated Name', email: 'updated@example.com' };
            const response = await request(app)
                .put(`/users/${userId}`)
                .send(userData)
                .set('Content-Type', 'application/json');

            expect(response.status).toBe(200);
            expect(userController.updateUser).toHaveBeenCalledTimes(1);
            expect(response.body).toEqual({ test: 'updateUser', id: userId, body: userData });
        });
    });

    describe('DELETE /users/:id', () => {
        it('should call deleteUser controller with the correct ID', async () => {
            const userId = '123';
            const response = await request(app).delete(`/users/${userId}`);

            expect(response.status).toBe(200);
            expect(userController.deleteUser).toHaveBeenCalledTimes(1);
            expect(response.body).toEqual({ test: 'deleteUser', id: userId });
        });
    });
});