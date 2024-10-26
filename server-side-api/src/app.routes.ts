import express from 'express';
import todoRouter from './todo/router';
import authRouter from './auth/router';

const router = express.Router();

router.use('/api/v1', todoRouter, authRouter);

export default router;
