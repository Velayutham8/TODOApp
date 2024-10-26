import express from 'express';
import {
  reqDataValidation,
  checkUserExist,
  isPasswordMatch,
  signin,
} from './middleware';

const router = express.Router();

router.use(reqDataValidation, checkUserExist, isPasswordMatch, signin);

export default router;
