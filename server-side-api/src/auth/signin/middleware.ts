import { NextFunction, Request, Response } from 'express';
import { Db } from 'mongodb';
import { getMongodb } from '../../db/mongodb';
import * as uuid from 'uuid';
import Joi from 'joi';
import { validateObject } from '../../utils/utils';
import { USERS_COLLECTION_NAME } from '../../utils/COLLECTIONS';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata } = res.locals;

  const { username } = reqdata;

  const db: Db = await getMongodb();

  const userdata = await db.collection(USERS_COLLECTION_NAME).findOne(
    {
      username,
    },
    {
      projection: {
        _id: 0,
      },
    }
  );

  if (!userdata) {
    res.status(400).json({
      status: 400,
      information: 'User not found!..',
    });
    return;
  }

  res.locals = { ...res.locals, userdata };

  next();
  return;
};

export const isPasswordMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata, userdata } = res.locals;

  const { password } = reqdata;

  const { hashedPassword } = userdata;

  const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordMatched) {
    res.status(400).json({
      status: 400,
      information: 'Wrong Password',
    });
    return;
  }

  next();
  return;
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userdata } = res.locals;

  const { accountid } = userdata;

  const token = jwt.sign({ accountid }, 'tokensecret', { expiresIn: 60 * 5 }); // 5 Minutes

  res.status(200).json({
    status: 200,
    token,
    accountid,
  });
  return;
};
