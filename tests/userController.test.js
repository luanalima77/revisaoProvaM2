const userController = require('../controllers/userController');
const userModel = require('../models/userModel');
jest.mock('../models/userModel');

//*************PRINCIPAL ERRO A SER CORRIGIDO: NOME DAS FUNÇÕES DO MODEL E DO CONTROLLER***********/
describe('User Controller', () => {
    let mockRequest;
    let mockResponse;
    
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('getAllUsers', () => {
        it('should return all users with status 200', async () => {
            const mockUsers = [{ id: 1, name: 'John', email: 'john@example.com' }];
            userModel.getAll = jest.fn().mockResolvedValue(mockUsers);

            await userController.getAllUsers(mockRequest, mockResponse);
            
            expect(userModel.getAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should return 500 when an error occurs', async () => {
            const errorMessage = 'Database error';
            userModel.getAll = jest.fn().mockRejectedValue(new Error(errorMessage));

            await userController.getAllUsers(mockRequest, mockResponse);
            
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('getUserById', () => {
        it('should return user with status 200 when user exists', async () => {
            const mockUser = { id: 1, name: 'John', email: 'john@example.com' };
            mockRequest.params = { id: 1 };
            userModel.getById = jest.fn().mockResolvedValue(mockUser);

            await userController.getUserById(mockRequest, mockResponse);
            
            expect(userModel.getById).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 when user does not exist', async () => {
            mockRequest.params = { id: 999 };
            userModel.getById = jest.fn().mockResolvedValue(null);

            await userController.getUserById(mockRequest, mockResponse);
            
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
        });

        it('should return 500 when an error occurs', async () => {
            mockRequest.params = { id: 1 };
            const errorMessage = 'Database error';
            userModel.getById = jest.fn().mockRejectedValue(new Error(errorMessage));

            await userController.getUserById(mockRequest, mockResponse);
            
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('createUser', () => {
        it('should create a user and return 201', async () => {
            const mockUser = { id: 1, name: 'John', email: 'john@example.com' };
            mockRequest.body = { name: 'John', email: 'john@example.com' };
            userModel.create = jest.fn().mockResolvedValue(mockUser);

            await userController.createUser(mockRequest, mockResponse);
            
            expect(userModel.create).toHaveBeenCalledWith('John', 'john@example.com');
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 500 when an error occurs', async () => {
            mockRequest.body = { name: 'John', email: 'john@example.com' };
            const errorMessage = 'Database error';
            userModel.create = jest.fn().mockRejectedValue(new Error(errorMessage));

            await userController.createUser(mockRequest, mockResponse);
            
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('updateUser', () => {
        it('should update a user and return 200', async () => {
            const mockUser = { id: 1, name: 'John Updated', email: 'john@example.com' };
            mockRequest.params = { id: 1 };
            mockRequest.body = { name: 'John Updated', email: 'john@example.com' };
            userModel.update = jest.fn().mockResolvedValue(mockUser);

            await userController.updateUser(mockRequest, mockResponse);
            
            expect(userModel.update).toHaveBeenCalledWith(1, 'John Updated', 'john@example.com');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 when user does not exist', async () => {
            mockRequest.params = { id: 999 };
            mockRequest.body = { name: 'John', email: 'john@example.com' };
            userModel.update = jest.fn().mockResolvedValue(null);

            await userController.updateUser(mockRequest, mockResponse);
            
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
        });

        it('should return 500 when an error occurs', async () => {
            mockRequest.params = { id: 1 };
            mockRequest.body = { name: 'John', email: 'john@example.com' };
            const errorMessage = 'Database error';
            userModel.update = jest.fn().mockRejectedValue(new Error(errorMessage));

            await userController.updateUser(mockRequest, mockResponse);
            
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('deleteUser', () => {
        it('should delete a user and return 200', async () => {
            const mockUser = { id: 1, name: 'John', email: 'john@example.com' };
            mockRequest.params = { id: 1 };
            userModel.delete = jest.fn().mockResolvedValue(mockUser);

            await userController.deleteUser(mockRequest, mockResponse);
            
            expect(userModel.delete).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 when user does not exist', async () => {
            mockRequest.params = { id: 999 };
            userModel.delete = jest.fn().mockResolvedValue(null);

            await userController.deleteUser(mockRequest, mockResponse);
            
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' });
        });

        it('should return 500 when an error occurs', async () => {
            mockRequest.params = { id: 1 };
            const errorMessage = 'Database error';
            userModel.delete = jest.fn().mockRejectedValue(new Error(errorMessage));

            await userController.deleteUser(mockRequest, mockResponse);
            
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});