import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
    process.env.JWT_KEY = 'secret';
    process.env.USER_BASE_URL = 'http://localhost:3000';

    if (!process.env.EMAIL_USER) throw new Error("Missing env variable EMAIL_USER");
    if (!process.env.EMAIL_PASSWORD) throw new Error("Missing env variable EMAIL_PASSWORD");
    if (!process.env.EMAIL_RECEIVER) throw new Error("Missing env variable EMAIL_RECEIVER");

    try {
        await mongoose.connect('mongodb://68.183.211.72:27017/mariassagofoto', { useNewUrlParser: true });
        console.log('Connected to mongodb');
    } catch (err) {
        console.log('Cannot connect to mongodb', err);
        process.exit(1);
    }

    const port = app.get('port');
    app.listen(port, () => {
        console.log("Server running on port ", port);
    });
};

start();