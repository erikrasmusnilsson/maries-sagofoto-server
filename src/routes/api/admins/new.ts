import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth } from '../../../middlewares/require-auth';
import { validateRequest } from '../../../middlewares/validate-request';
import { BadRequestError } from '../../../errors/bad-request-error';
import { User } from '../../../models/user';

const router = express.Router();

router.post('/api/admins', requireAuth, [
    body('username')
        .notEmpty()
        .withMessage('Must include a username'),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Must include a password that is at least 6 characters long.')
], validateRequest, async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });

    if (existing) throw new BadRequestError('User already exists.');

    const user = User.build({ username, password });

    await user.save();

    res.status(201).send(user);
});

router.post('/api/admins/create', async (_, res) => {
    const user = User.build({
       username: 'admin',
       password: 'test',
    });
 
    await user.save();
 
    res.send(user);
 });

export { router as createAdminRouter };