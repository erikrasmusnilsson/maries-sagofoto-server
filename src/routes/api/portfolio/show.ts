import express, { Request, Response } from 'express';
import fs from 'fs';

const PORTFOLIO_PAGE_SIZE = 6;
export const VALID_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg'];

const router = express.Router();

router.get('/api/portfolio', async (req: Request, res: Response) => {
    const page = req.query.page;
    const filenames = fs.readdirSync('./public/portfolio');

    const filtered = filenames.filter(filename => {
        const extension = filename.split('.').pop();
        if (!extension) return false;
        
        return VALID_FILE_EXTENSIONS.findIndex(ext => ext === extension) > -1;
    });

    if (page) {
        const pageNumber = Number(page);
        
        const start = pageNumber * PORTFOLIO_PAGE_SIZE;
        const end = (start + PORTFOLIO_PAGE_SIZE) <= filtered.length ? start + PORTFOLIO_PAGE_SIZE : filtered.length;
        
        const result = filtered.slice(start, end);
        return res.send(result);
    }

    res.send(filtered);
});

export { router as showPortfolioRouter };