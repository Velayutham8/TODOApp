import express from 'express';
import todoRoutes from './routes';
import { extractToken, getReqData, verifyToken } from '../utils/utils';

const router = express.Router();

router.use('/auth', getReqData, todoRoutes);

export default router;
