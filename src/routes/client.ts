import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/*', (req: Request, res: Response) => {
    res.redirect(`http://localhost:3000${req.originalUrl}`);
});

export { router as clientRouter };