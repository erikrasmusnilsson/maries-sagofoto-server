import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotFoundError } from '../../../errors/not-found-error';

import { requireAuth } from '../../../middlewares/require-auth';
import { validateRequest } from '../../../middlewares/validate-request';
import { User } from '../../../models/user';

const router = express.Router();

router.put('/api/admins', requireAuth, [
    body('password')
        .isLength({ min: 6 })
        .withMessage('Must include password of at least 6 characters')
], validateRequest, async (req: Request, res: Response) => {
    const { password } = req.body;
    const user = await User.findById(req.user!.id);
    
    if (!user) {
        throw new NotFoundError();
    }

    user.set('password', password);

    await user.save();

    res.send(user);
});

export { router as updateAdminRouter };