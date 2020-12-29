import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/admins/logout', (req, res) => {
    req.session = null;
    res.send({});
});

export { router as logoutRouter };