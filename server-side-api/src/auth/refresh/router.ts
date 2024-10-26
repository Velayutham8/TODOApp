import express from 'express';
import { reqDataValidation, todoCreate } from './middleware';

const router = express.Router();

router.use(reqDataValidation, todoCreate);

export default router;
