import express, { Request, Response } from 'express';
import { uploadPortfolio } from '../../../middlewares/file-upload';

import { requireAuth } from '../../../middlewares/require-auth';


const router = express.Router();

router.post('/api/portfolio',  requireAuth, uploadPortfolio.single("photo"), async (req: Request, res: Response) => {
    res.status(201).send();
});

export { router as createPortfolioRouter };