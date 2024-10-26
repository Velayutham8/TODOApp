//getReqData //extractToken //verifyToken //validationJoiFunction

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

//Middleware
export const getReqData = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST') {
    res.locals = { ...res.locals, reqdata: req.body };
    next();
    return;
  } else {
    res.locals = { ...res.locals, reqdata: req.query };
    next();
    return;
  }
};
//Middleware
export const extractToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization as string;

  if (!authHeader) {
    res
      .status(400)
      .json({ status: 400, information: 'Token not found in headers' });
    return;
  }

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);

    res.locals = { ...res.locals, token };
    next();
    return;
  } else {
    //Error
    res.status(400).json({ status: 400, information: 'Token not found' });
    return;
  }
};
//Middleware
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = res.locals;

  let decoded: any;

  try {
    decoded = jwt.verify(token, 'tokensecret');
  } catch (error: any) {
    res.status(400).json({ status: 400, information: 'Token expired' });
    return;
  }

  const { accountid } = decoded;

  res.locals = { ...res.locals, accountid };

  next();
  return;
};

//Function
export const validateObject = async ({
  schema,
  object,
}: {
  schema: any;
  object: any;
}) => {
  try {
    await schema.validateAsync(object);
  } catch (err: any) {
    console.log('err in validation', err.message);
    throw new Error(err.message);
  }
};

//Function
export const generateRandomString = (length: number) => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
};
