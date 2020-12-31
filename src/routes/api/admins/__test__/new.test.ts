import request from 'supertest';

import { app } from '../../../../app';
import { signin } from '../../../../test/auth';
import { User } from '../../../../models/user';

it('returns 401 if user is not logged in', async () => {
    const credentials = {
        username: 'username',
        password: 'password'
    };
    
    await request(app)
        .post('/api/admins')
        .send(credentials)
        .expect(401);
});

it('returns 400 with bad username', async () => {
    const cookie = signin();
    
    const credentials = {
        username: 'username',
        password: 'password'
    };
    
    await request(app)
        .post('/api/admins')
        .set('Cookie', cookie)
        .send({
            password: credentials.password
        })
        .expect(400);
});

it('returns 400 with bad password', async () => {
    const cookie = signin();
    
    const credentials = {
        username: 'username',
        password: 'password'
    };
    
    await request(app)
        .post('/api/admins')
        .set('Cookie', cookie)
        .send({
            username: credentials.username,
            password: '1234'
        })
        .expect(400);

    await request(app)
        .post('/api/admins')
        .set('Cookie', cookie)
        .send({
            username: credentials.username,
        })
        .expect(400);
});

it('returns 201 with valid credentials', async () => {
    const cookie = signin();
    
    const credentials = {
        username: 'username',
        password: 'password'
    };
    
    await request(app)
        .post('/api/admins')
        .set('Cookie', cookie)
        .send(credentials)
        .expect(201);
});

it('creates a user in the database on success', async () => {
    const cookie = signin();
    
    const credentials = {
        username: 'username',
        password: 'password'
    };
    
    await request(app)
        .post('/api/admins')
        .set('Cookie', cookie)
        .send(credentials)
        .expect(201);
    
    const user = await User.findOne({
        username: credentials.username 
    });

    expect(user).toBeDefined();
});