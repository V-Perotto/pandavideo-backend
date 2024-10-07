const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  it('deve cadastrar um novo usuário', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: 'testuser',
      password: 'testpass'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('deve fazer login em um usuário existente', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'testpass'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
