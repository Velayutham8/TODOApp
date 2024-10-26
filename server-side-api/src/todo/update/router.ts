import express from 'express';
import { reqDataValidation, todoUpdate } from './middleware';

const router = express.Router();

router.use(reqDataValidation, todoUpdate);

export default router;
