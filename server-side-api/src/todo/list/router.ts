import express from 'express';
import { todoList } from './middleware';

const router = express.Router();

router.use(todoList);

export default router;
