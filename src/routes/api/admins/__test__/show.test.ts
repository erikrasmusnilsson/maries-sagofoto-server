import request from 'supertest';

import { app } from '../../../../app';
import { signup } from '../../../../test/auth';

it('returns 401 if user is not logged in', async () => {
    await request(app)
        .get('/api/admins')
        .send()
        .expect(401);
});

it('returns the user if logged in', async () => {
    const cookie = signup();
    
    const response = await request(app)
        .get('/api/admins')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.id).toBeDefined();
    expect(response.body.username).toBeDefined();
});