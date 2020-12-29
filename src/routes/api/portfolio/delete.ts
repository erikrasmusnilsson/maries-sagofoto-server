import express from 'express';
import fs from 'fs';

import { requireAuth } from '../../../middlewares/require-auth';
import { NotFoundError } from '../../../errors/not-found-error';

const router = express.Router();

router.delete('/api/portfolio/:name', requireAuth, (req, res) => {
    const path = `./public/portfolio/${req.params.name}`;

    if (!fs.existsSync(path)) {
        throw new NotFoundError();
    }
    
    fs.unlinkSync(path);

    res.status(200).send();
});

export { router as deletePortfolioRouter };