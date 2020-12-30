import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
    process.env.JWT_KEY = 'secret';
    process.env.USER_BASE_URL = 'http://localhost:3000';

    try {
        await mongoose.connect('mongodb://localhost:27017/mariassagofoto', { useNewUrlParser: true });
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