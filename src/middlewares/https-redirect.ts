import { Request, Response, NextFunction } from 'express';

const httpsRedirect = (req: Request, res: Response, next: NextFunction) => {
    if (req.get("Upgrade-Insecure-Requests") === "1") {
        res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
        next();
    }
}

export { httpsRedirect };