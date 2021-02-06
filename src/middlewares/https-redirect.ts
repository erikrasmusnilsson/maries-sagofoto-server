import { Request, Response, NextFunction } from 'express';

const httpsRedirect = (req: Request, res: Response, next: NextFunction) => {
    if (req.get("Upgrade-Insecure-Requests")) {
        console.log("Upgrading request...")
        res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
        console.log("Using HTTP without encryption...")
        next();
    }
}

export { httpsRedirect };