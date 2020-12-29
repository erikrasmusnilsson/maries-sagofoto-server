import express, { Request } from 'express';

import { requireAuth } from '../../../middlewares/require-auth';

const router = express.Router();

router.get('/api/admins', requireAuth, async (req: Request, res) => {
    const user = req.user || null;
    res.send(user);
});

export { router as showAdminRouter };