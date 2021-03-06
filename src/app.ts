import 'express-async-errors';
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import cookies from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';
import { httpsRedirect } from './middlewares/https-redirect';
import { envSetup } from './env-setup';

import { loginRouter } from './routes/api/admins/login';
import { logoutRouter } from './routes/api/admins/logout';
import { showAdminRouter } from './routes/api/admins/show';
import { createAdminRouter } from './routes/api/admins/new';
import { updateAdminRouter } from './routes/api/admins/update';

import { showPortfolioRouter } from './routes/api/portfolio/show';
import { createPortfolioRouter } from './routes/api/portfolio/new';
import { deletePortfolioRouter } from './routes/api/portfolio/delete';

import { contactRouter } from './routes/api/contact';

import { clientRouter } from './routes/client';

envSetup();

const app = express();

if (process.env.PROD === "1") {
    app.use(httpsRedirect);
    app.enable("trust proxy");
}

app.use(express.static(`public/client`));
app.use(cors({ origin: ['http://mariessagofoto.se', 'https://mariessagofoto.se'], credentials: true }));
app.use('/portfolio', express.static(`public/portfolio`));

app.use(json());
app.use(cookies({
    signed: false,
    secure: false
}));

app.use(loginRouter);
app.use(logoutRouter);
app.use(showAdminRouter);
app.use(createAdminRouter);
app.use(updateAdminRouter);

app.use(createPortfolioRouter);
app.use(deletePortfolioRouter);
app.use(showPortfolioRouter);

app.use(contactRouter);

app.use(clientRouter);

app.use(errorHandler);

app.set('port', 80);

export { app };