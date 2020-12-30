import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../../middlewares/validate-request';
import { sendMail } from '../../services/email';

const router = express.Router();

router.post('/api/contact', [
    body('name')
        .notEmpty()
        .withMessage('Must provide a valid name'),
    body('email')
        .isEmail()
        .withMessage('Must provide a valid email'),
    body('content')
        .notEmpty()
        .withMessage('Must include a message')
], validateRequest, async (req: Request, res: Response) => {
    const { name, email, content } = req.body;

    const subject = `Kontaktförfrågan från ${name}`;
    const text = `${content}\nAvsändare\n${name}\n${email}`;

    await sendMail(subject, text);

    res.send({});
});

export { router as contactRouter };