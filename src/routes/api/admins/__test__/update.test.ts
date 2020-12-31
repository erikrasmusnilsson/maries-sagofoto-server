import request from 'supertest';

import { app } from '../../../../app';
import { signup } from '../../../../test/auth';
import { PasswordHasher } from '../../../../services/password-hasher';
import { User } from '../../../../models/user';

it('returns 400 with invalid password', async () => {
    const cookie = await signup();

    await request(app)
        .put('/api/admins')
        .set('Cookie', cookie)
        .send({})
        .expect(400);

    await request(app)
        .put('/api/admins')
        .set('Cookie', cookie)
        .send({
            password: '1234'
        })
        .expect(400);
});

it('returns 200 with valid body', async () => {
    const cookie = await signup();

    await request(app)
        .put('/api/admins')
        .set('Cookie', cookie)
        .send({
            password: '123456'
        })
        .expect(200);
});

it('changes the password on success', async () => {
    const cookie = await signup();

    const password = '123456';

    await request(app)
        .put('/api/admins')
        .set('Cookie', cookie)
        .send({ password })
        .expect(200);
    
    const user = await User.findOne({ username: 'user' });
    
    const passwordHasChanged = await PasswordHasher.compare(password, user!.password);

    expect(passwordHasChanged).toEqual(true);
});