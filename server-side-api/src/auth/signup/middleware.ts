import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { Db } from 'mongodb';
import { getMongodb } from '../../db/mongodb';
import { USERS_COLLECTION_NAME } from '../../utils/COLLECTIONS';
import { generateRandomString, validateObject } from '../../utils/utils';

export const reqDataValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata } = res.locals;

  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(8).required(),
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

export const checkUsernameExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata } = res.locals;

  const { username } = reqdata;

  const db: Db = await getMongodb();

  const count = await db.collection(USERS_COLLECTION_NAME).countDocuments({
    username,
  });

  if (count) {
    res.status(400).json({
      status: 400,
      information: 'User Already Exist!..',
    });
    return;
  }

  next();
  return;
};

export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata } = res.locals;

  const { password } = reqdata;

  const hashedPassword = await bcrypt.hash(password, 7);

  res.locals = { ...res.locals, hashedPassword };

  next();
  return;
};

export const generateAccountId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accountid = generateRandomString(12);

  res.locals = { ...res.locals, accountid };

  next();
  return;
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata, accountid, hashedPassword } = res.locals;

  const { username } = reqdata;

  const db: Db = await getMongodb();

  await db.collection(USERS_COLLECTION_NAME).insertOne({
    accountid,
    username,
    hashedPassword,
    createdat: new Date(),
  });

  res.status(201).json({
    status: 201,
    data: 'New User Created!',
  });
  return;
};
