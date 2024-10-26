import { NextFunction, Request, Response } from 'express';
import { Db } from 'mongodb';
import { getMongodb } from '../../db/mongodb';
import * as uuid from 'uuid';
import Joi from 'joi';
import { validateObject } from '../../utils/utils';
import { TODO_COLLECTION_NAME } from '../../utils/COLLECTIONS';

export const todoList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accountid } = res.locals;

  const id = uuid.v4();

  const db: Db = await getMongodb();

  const todoList = await db
    .collection(TODO_COLLECTION_NAME)
    .find(
      {
        accountid,
      },
      {
        projection: {
          _id: 0,
          id: 1,
          todo: 1,
          createdat: 1,
        },
      }
    )
    .toArray();

  res.status(200).json({
    status: 200,
    data: todoList,
  });
  return;
};
