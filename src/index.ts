import { app } from './app';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';

const start = async () => {
    
    process.env.USER_BASE_URL = 'http://localhost:3000';

    if (!process.env.EMAIL_USER) throw new Error("Missing env variable EMAIL_USER");
    if (!process.env.EMAIL_PASSWORD) throw new Error("Missing env variable EMAIL_PASSWORD");
    if (!process.env.EMAIL_RECEIVER) throw new Error("Missing env variable EMAIL_RECEIVER");
    if (!process.env.JWT_KEY) throw new Error("Missing JWT key.")

    try {
        await mongoose.connect('mongodb://localhost:27017/mariassagofoto', { useNewUrlParser: true });
        console.log('Connected to mongodb');
    } catch (err) {
        console.log('Cannot connect to mongodb', err);
        process.exit(1);
    }

    if (process.env.PROD === "1") {
        if (!process.env.KEY_FILE) throw new Error("Missing key file!");
        if (!process.env.CERT) throw new Error("Missing cert file!");
        const opts = {
            key: fs.readFileSync(process.env.KEY_FILE),
            cert: fs.readFileSync(process.env.CERT)
        }
        app.listen(app.get('port'), () => console.log("Server is running..."))
        https.createServer(opts, app).listen(443);
    } else {
        const port = app.get('port');
        app.listen(port, () => {
            console.log("Server running on port ", port);
        });
    }
};

start();