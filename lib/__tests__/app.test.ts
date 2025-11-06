import { describe, test, expect, beforeAll } from 'bun:test';
import request from 'supertest';
import app from '../app';

describe('Express App', () => {
  let csrfToken: string;

  beforeAll(async () => {
    // Get CSRF token for protected routes
    const res = await request(app).get(process.env.CSRF_ROUTE ?? '/csrf-token');
    csrfToken = res.body.data.csrfToken;
  });

  describe('GET /', () => {
    test('should return app info', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('version');
    });
  });

  describe('CSRF Protection', () => {
    test('should return CSRF token', async () => {
      const res = await request(app).get(
        process.env.CSRF_ROUTE ?? '/csrf-token'
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('csrfToken');
      expect(res.body.message).toBe('CSRF Token fetched successfully');
    });
  });

  describe('Error Handling', () => {
    test('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/non-existent');
      expect(res.status).toBe(404);
    });
  });
});

