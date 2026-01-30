import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../src/backend/app.js';
import User from '../src/backend/models/User.js';

vi.mock('../src/backend/models/User.js');

describe('Backend API', () => {
  describe('Health Check', () => {
    it('should return 200 OK', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OK');
    });
  });

  describe('Auth API', () => {
    it('should handle login with invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'password' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});
