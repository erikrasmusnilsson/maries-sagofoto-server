import 'express-async-errors';
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import cookies from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';

import { clientRouter } from './routes/client';
import { loginRouter } from './routes/api/admins/login';
import { logoutRouter } from './routes/api/admins/logout';
import { showAdminRouter } from './routes/api/admins/show';
import { createAdminRouter } from './routes/api/admins/new';

import { showPortfolioRouter } from './routes/api/portfolio/show';
import { createPortfolioRouter } from './routes/api/portfolio/new';
import { deletePortfolioRouter } from './routes/api/portfolio/delete';

const app = express();

app.use('/static', express.static(`public`));

app.use(json());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(cookies({
    signed: false,
    secure: false
}));

app.use(loginRouter);
app.use(logoutRouter);
app.use(showAdminRouter);
app.use(createAdminRouter);

app.use(createPortfolioRouter);
app.use(deletePortfolioRouter);
app.use(showPortfolioRouter);

app.use(clientRouter);

app.use(errorHandler);

app.set('port', 3001);

export { app };