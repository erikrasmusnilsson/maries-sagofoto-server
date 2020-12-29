import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { NotAuthorizedError } from '../../../errors/not-authorized-error';
import { validateRequest } from '../../../middlewares/validate-request';
import { PasswordHasher } from '../../../services/password-hasher';
import { User } from '../../../models/user';

const router = express.Router();

router.post('/api/admins/login', [
   body('username')
      .notEmpty()
      .withMessage('Please supply a username'),
   body('password')
      .notEmpty()
      .withMessage('Please supply a password')
], validateRequest, async (req: Request, res: Response) => {
   const { username, password } = req.body;

   const user = await User.findOne({ username });

   if (!user) {
      throw new NotAuthorizedError();
   }

   if (!PasswordHasher.compare(password, user.password)) {
      throw new NotAuthorizedError();
   }

   const payload = {
      id: user._id,
      username: user.username
   };

   const token = jwt.sign(payload, process.env.JWT_KEY!);

   req.session = { jwt: token };

   res.send(user);
});

export { router as loginRouter };