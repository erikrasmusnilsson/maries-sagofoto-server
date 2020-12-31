import request from 'supertest';
import fs from 'fs';

import { app } from '../../../../app';
import { VALID_FILE_EXTENSIONS } from '../show';

it('returns all filenames with no query parameters', async () => {
    const response = await request(app)
        .get('/api/portfolio')
        .send()
        .expect(200);

    const filenames = fs.readdirSync('./public/portfolio');

    const filtered = filenames.filter(filename => {
        const extension = filename.split('.').pop();
        if (!extension) return false;
        
        return VALID_FILE_EXTENSIONS.findIndex(ext => ext === extension) > -1;
    });

    expect(response.body.length).toEqual(filtered.length);
});

it('returns six or all filenames with page = 0', async () => {
    const response = await request(app)
        .get('/api/portfolio?page=0')
        .send()
        .expect(200);

    const filenames = fs.readdirSync('./public/portfolio');

    const filtered = filenames.filter(filename => {
        const extension = filename.split('.').pop();
        if (!extension) return false;
        
        return VALID_FILE_EXTENSIONS.findIndex(ext => ext === extension) > -1;
    });

    const expectedLength = filtered.length > 6 ? 6 : filtered.length;

    expect(response.body.length).toEqual(expectedLength);
});