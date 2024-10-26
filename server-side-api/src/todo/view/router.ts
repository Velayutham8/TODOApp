import express from 'express';
import { reqDataValidation, todoView } from './middleware';

const router = express.Router();

router.use(reqDataValidation, todoView);

export default router;
