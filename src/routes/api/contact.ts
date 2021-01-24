import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../../middlewares/validate-request';
import { sendMail } from '../../services/email';

const router = express.Router();

router.post('/api/contact', [
    body('firstName')
        .notEmpty()
        .withMessage('Must provide a valid first name'),
    body('lastName')
        .notEmpty()
        .withMessage('Must provide a valid last name.'),
    body('email')
        .isEmail()
        .withMessage('Must provide a valid email'),
    body('message')
        .notEmpty()
        .withMessage('Must include a message')
], validateRequest, 
async (req: Request, res: Response) => {
    const { firstName, lastName, email, message } = req.body;
    const name = `${firstName} ${lastName}`;

    const subject = `Kontaktförfrågan från ${name}`;
    const text = `${message}\nAvsändare\n${name}\n${email}`;

    await sendMail(subject, text);

    res.send({});
});

export { router as contactRouter };