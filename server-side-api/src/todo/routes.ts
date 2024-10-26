import express from 'express';
import createRouter from './create/router';
import listRouter from './list/router';
import viewRouter from './view/router';
import deleteRouter from './delete/router';
import updateRouter from './update/router';

const router = express.Router();

router.post('/create', createRouter);
router.get('/list', listRouter);
router.get('/view', viewRouter);
router.delete('/delete', deleteRouter);
router.put('/update', updateRouter);

export default router;
