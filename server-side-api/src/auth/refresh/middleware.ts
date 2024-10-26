import { NextFunction, Request, Response } from 'express';
import { Db } from 'mongodb';
import { getMongodb } from '../../db/mongodb';
import * as uuid from 'uuid';
import Joi from 'joi';
import { validateObject } from '../../utils/utils';
import { TODO_COLLECTION_NAME } from '../../utils/COLLECTIONS';

export const reqDataValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata } = res.locals;

  const schema = Joi.object({
    todo: Joi.string().min(1).max(500).required(),
  });

  try {
    await validateObject({ schema, object: reqdata });
  } catch (error: any) {
    res.json({ status: 400, information: error.message });
    return;
  }

  next();
  return;
};

export const todoCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata, accountid } = res.locals;

  const { todo } = reqdata;

  const id = uuid.v4();

  const db: Db = await getMongodb();

  await db.collection(TODO_COLLECTION_NAME).insertOne({
    id,
    todo,
    accountid,
    createdat: new Date(),
  });

  res.status(201).json({
    status: 201,
    data: 'Todo Created!',
  });
  return;
};
