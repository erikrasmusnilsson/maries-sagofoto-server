import request from 'supertest';

import { app } from '../../../../app';
import { User } from '../../../../models/user';
import { signin } from '../../../../test/auth';

it('returns 400 with bad username', async () => {
    await request(app)
        .post('/api/admins/login')
        .send({
            password: 'some_password'
        })
        .expect(400);
});

it('returns 400 with bad password', async () => {
    await request(app)  
        .post('/api/admins/login')
        .send({
            username: 'username'
        })
        .expect(400);
}); 

it('returns 401 with wrong username', async () => {
    const credentials = {
        username: 'username',
        password: 'password'
    };

    const testUser = User.build(credentials);

    await testUser.save();

    await request(app)
        .post('/api/admins/login')
        .send({
            username: 'wrong_username',
            password: credentials.password
        })
        .expect(401);
});

it('returns 401 with wrong password', async () => {
    const credentials = {
        username: 'username',
        password: 'password'
    };
    
    const testUser = User.build(credentials);

    await testUser.save();

    await request(app)
        .post('/api/admins/login')
        .send({
            username: credentials.username,
            password: 'wrong_password'
        })
        .expect(401);
});

it('sets a cookie on success', async () => {
    const credentials = {
        username: 'username',
        password: 'password'
    };
    
    const testUser = User.build(credentials);

    await testUser.save();

    const response = await request(app)
        .post('/api/admins/login')
        .send(credentials)
        .expect(200);
    
    expect(response.get('Set-Cookie')).toBeDefined();
})