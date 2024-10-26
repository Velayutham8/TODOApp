import express from 'express';
import signinRouter from './signin/router';
import signupRouter from './signup/router';
import refreshRouter from './refresh/router';
import { extractToken, verifyToken } from '../utils/utils';

const router = express.Router();

router.post('/signup', signupRouter);
router.post('/signin', signinRouter);
router.get('/refresh', extractToken, refreshRouter);

export default router;
