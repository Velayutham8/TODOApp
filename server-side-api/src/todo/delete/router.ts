import express from 'express';
import { reqDataValidation, todoDelete } from './middleware';

const router = express.Router();

router.use(reqDataValidation, todoDelete);

export default router;
