import request from 'supertest';

import { app } from '../../../../app';
import { signin } from '../../../../test/auth';

it('resets the cookie to null', async () => {
    const cookie = signin();

    const response = await request(app)
        .post('/api/admins/logout')
        .set('Cookie', cookie)
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});