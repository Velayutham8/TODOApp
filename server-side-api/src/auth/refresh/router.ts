import express from 'express';
import { verifyTokenForRefresh } from './middleware';
import { extractToken } from '../../utils/utils';

const router = express.Router();

router.use(verifyTokenForRefresh);

export default router;
