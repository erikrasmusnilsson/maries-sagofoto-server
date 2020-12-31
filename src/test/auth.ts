import mongoose from 'mongoose';
import request from 'supertest';

import jwt from 'jsonwebtoken'; 

import { app } from '../app';

export const signin = () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const payload = {
        id,
        username: "username"
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session =  { jwt: token };

    const json = JSON.stringify(session);

    const base64 = Buffer.from(json).toString("base64");

    return [`express:sess=${base64}`];
}

export const signup = async () => {
    const cookie = signin();

    const credentials = {
        username: 'user',
        password: 'password'
    };

    await request(app)
        .post('/api/admins')
        .set('Cookie', cookie)
        .send(credentials)
        .expect(201);

    const response = await request(app)
        .post('/api/admins/login')
        .send(credentials)
        .expect(200);
    
    return response.get('Set-Cookie');
}