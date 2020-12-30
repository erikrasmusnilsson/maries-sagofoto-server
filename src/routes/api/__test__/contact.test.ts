import request from 'supertest';

import { app } from '../../../app';
import { sendMail } from '../../../services/email';

jest.mock('../../../services/email');

it('returns 400 with no name', async () => {
    await request(app)
        .post('/api/contact')
        .send({
            email: 'test@test.com',
            content: 'Example content.'
        })
        .expect(400);
});

it('returns 400 with invalid email', async () => {
    await request(app)
        .post('/api/contact')
        .send({
            email: 'testest.com',
            name: 'Test Tester',
            content: 'Example content.'
        })
        .expect(400);
    
    await request(app)
        .post('/api/contact')
        .send({
            name: 'Test Tester',
            content: 'Example content.'
        })
        .expect(400);
});

it('returns 400 with no content', async () => {
    await request(app)
        .post('/api/contact')
        .send({
            email: 'test@test.com',
            name: 'Test Tester'
        })
        .expect(400);
});

it('calls the email service with valid parameters', async () => {
    await request(app)
        .post('/api/contact')
        .send({
            email: 'test@tester.com',
            name: 'Test Tester',
            content: 'Example content'
        })
        .expect(200);

    expect(sendMail).toHaveBeenCalled();
});