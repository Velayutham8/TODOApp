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
    id: Joi.string().uuid().required(),
  });

  try {
    await validateObject({ schema, object: reqdata });
  } catch (error: any) {
    res.json({ status: 400, information: error });
    return;
  }

  next();
  return;
};

export const todoView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata, accountid } = res.locals;

  const { id } = reqdata;

  const db: Db = await getMongodb();

  const data = await db.collection(TODO_COLLECTION_NAME).findOne(
    {
      accountid,
      id,
    },
    {
      projection: {
        _id: 0,
      },
    }
  );

  res.status(200).json({
    status: 200,
    data,
  });
  return;
};
