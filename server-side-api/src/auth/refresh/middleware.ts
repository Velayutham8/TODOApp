import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { validateObject } from '../../utils/utils';

export const reqDataValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reqdata } = res.locals;

  const schema = Joi.object({
    accountid: Joi.string().min(12).max(12).required(),
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

export const verifyTokenForRefresh = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, reqdata } = res.locals;

  let decoded: any;

  try {

    decoded = jwt.verify(token, 'tokensecret');
  } catch (error: any) {
    const { accountid } = reqdata;

    //New token
    const token = jwt.sign({ accountid }, 'tokensecret', { expiresIn: 60 * 5 }); // 5 Minutes

    console.log('error in token', { accountid, token });
    res.status(200).json({
      status: 200,
      information: 'Token expired',
      accountid,
      newtoken: token,
    });
    return;
  }

  const { accountid } = decoded;

  res
    .status(200)
    .json({ status: 200, information: 'Token Valid!...', accountid });

  next();
  return;
};
