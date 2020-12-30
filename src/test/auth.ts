import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';

export const signup = () => {
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