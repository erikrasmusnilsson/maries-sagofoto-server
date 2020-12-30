import request from 'supertest';
import fs from 'fs';

import { app } from '../../../../app';

it('returns all filenames with no query parameters', async () => {
    const response = await request(app)
        .get('/api/portfolio')
        .send()
        .expect(200);

    const filenames = fs.readdirSync('./public/portfolio');

    expect(response.body.length).toEqual(filenames.length);
});

it('returns six or all filenames with page = 0', async () => {
    const response = await request(app)
        .get('/api/portfolio?page=0')
        .send()
        .expect(200);

    const filenames = fs.readdirSync('./public/portfolio');

    const expectedLength = filenames.length > 6 ? 6 : filenames.length;

    expect(response.body.length).toEqual(expectedLength);
});