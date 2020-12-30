import express, { Request, Response } from 'express';
import fs from 'fs';

const PORTFOLIO_PAGE_SIZE = 6;

const router = express.Router();

router.get('/api/portfolio', async (req: Request, res: Response) => {
    const page = req.query.page;
    const filenames = fs.readdirSync('./public/portfolio');

    if (page) {
        const pageNumber = Number(page);
        
        const start = pageNumber * PORTFOLIO_PAGE_SIZE;
        const end = (start + PORTFOLIO_PAGE_SIZE) <= filenames.length ? start + PORTFOLIO_PAGE_SIZE : filenames.length - 1;
        
        const result = filenames.slice(start, end);
        return res.send(result);
    }

    res.send(filenames);
});

export { router as showPortfolioRouter };