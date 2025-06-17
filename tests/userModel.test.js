const User = require('../models/userModel');
const db = require('../config/db');

jest.mock('../config/db');

describe('User Model', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all users', async () => {
            const mockUsers = [
                { id: 1, name: 'John', email: 'john@example.com' },
                { id: 2, name: 'Jane', email: 'jane@example.com' }
            ];
            
            db.query.mockResolvedValue({ rows: mockUsers });

            const result = await User.getAll();
            
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users');
            expect(result).toEqual(mockUsers);
        });

        it('should handle database errors', async () => {
            db.query.mockRejectedValue(new Error('Database connection failed'));
            
            await expect(User.getAll()).rejects.toThrow('Database connection failed');
        });
    });

    describe('getById', () => {
        it('should return a user when found', async () => {
            const mockUser = { id: 1, name: 'John', email: 'john@example.com' };
            
            db.query.mockResolvedValue({ rows: [mockUser] });

            const result = await User.getById(1);
            
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', [1]);
            expect(result).toEqual(mockUser);
        });

        it('should return undefined when user not found', async () => {
            db.query.mockResolvedValue({ rows: [] });

            const result = await User.getById(999);
            
            expect(result).toBeUndefined();
        });

        it('should handle database errors', async () => {
            db.query.mockRejectedValue(new Error('Query failed'));
            
            await expect(User.getById(1)).rejects.toThrow('Query failed');
        });
    });

    describe('create', () => {
        it('should create and return a new user', async () => {
            const userData = { name: 'New User', email: 'new@example.com' };
            const createdUser = { id: 3, ...userData };
            
            db.query.mockResolvedValue({ rows: [createdUser] });

            const result = await User.create(userData);
            
            expect(db.query).toHaveBeenCalledWith(
                'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
                [userData.name, userData.email]
            );
            expect(result).toEqual(createdUser);
        });

        it('should handle database errors', async () => {
            const userData = { name: 'New User', email: 'new@example.com' };
            db.query.mockRejectedValue(new Error('Insert failed'));
            
            await expect(User.create(userData)).rejects.toThrow('Insert failed');
        });
    });

    describe('update', () => {
        it('should update and return a user', async () => {
            const userId = 1;
            const userData = { name: 'Updated User', email: 'updated@example.com' };
            const updatedUser = { id: userId, ...userData };
            
            db.query.mockResolvedValue({ rows: [updatedUser] });

            const result = await User.update(userId, userData);
            
            expect(db.query).toHaveBeenCalledWith(
                'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
                [userData.name, userData.email, userId]
            );
            expect(result).toEqual(updatedUser);
        });

        it('should return undefined when user not found', async () => {
            const userId = 999;
            const userData = { name: 'Updated User', email: 'updated@example.com' };
            
            db.query.mockResolvedValue({ rows: [] });

            const result = await User.update(userId, userData);
            
            expect(result).toBeUndefined();
        });

        it('should handle database errors', async () => {
            const userId = 1;
            const userData = { name: 'Updated User', email: 'updated@example.com' };
            
            db.query.mockRejectedValue(new Error('Update failed'));
            
            await expect(User.update(userId, userData)).rejects.toThrow('Update failed');
        });
    });

    describe('delete', () => {
        it('should delete a user and return true when successful', async () => {
            const userId = 1;
            
            db.query.mockResolvedValue({ rowCount: 1 });

            const result = await User.delete(userId);
            
            expect(db.query).toHaveBeenCalledWith('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
            expect(result).toBe(true);
        });

        it('should return false when user not found', async () => {
            const userId = 999;
            
            db.query.mockResolvedValue({ rowCount: 0 });

            const result = await User.delete(userId);
            
            expect(result).toBe(false);
        });

        it('should handle database errors', async () => {
            const userId = 1;
            
            db.query.mockRejectedValue(new Error('Delete failed'));
            
            await expect(User.delete(userId)).rejects.toThrow('Delete failed');
        });
    });
});