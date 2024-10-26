import express from 'express';
import {
  checkUsernameExist,
  generateAccountId,
  hashPassword,
  reqDataValidation,
  signup,
} from './middleware';

const router = express.Router();

router.use(
  reqDataValidation,
  checkUsernameExist,
  hashPassword,
  generateAccountId,
  signup
);

export default router;
