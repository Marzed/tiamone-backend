import { Request, Response } from 'express';
import User from '../models/user';
import mongoose, { Schema, Types } from 'mongoose';
import * as send from '../constants/response';
import { MongoCodeDuplicate } from '../constants/mongo-code';
import { IsValidObjectId } from '../helper/validate';
import Logger from '../logger/logger';

interface ResponseUserInfo {
  id: string;
  email: string;
  createdAt: string;
}

const createUser = (req: Request, res: Response) => {
  let { email, password } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    password,
  });

  return user
    .save()
    .then(() => {
      send.Success(res);
      return;
    })
    .catch((error) => {
      Logger.error('createUser', error.message);
      switch (error.code) {
        case MongoCodeDuplicate:
          send.AccountExist(res);
          return;
        default:
          send.ErrorInternal(res);
          return;
      }
    });
};

const updateUser = (req: Request, res: Response) => {
  let { id, email, password } = req.body;

  const user = new User({
    _id: id,
    email,
    password,
  });

  return user
    .updateOne(
      {
        $set: {
          email,
          password,
        },
      },
      { upsert: false }
    )
    .then((result) => {
      // unmodified
      if (result.modifiedCount === 0) {
        send.Error(res);
        return;
      }

      send.Success(res);
      return;
    })
    .catch((error) => {
      Logger.error('updateUser', error.message);
      return send.ErrorInternal(res);
    });
};

const getAllUsers = (req: Request, res: Response) => {
  User.find()
    .exec()
    .then((results) => {
      const data: Array<ResponseUserInfo> = results.map((value) => {
        let item: ResponseUserInfo = {
          id: value.id,
          email: value.email,
          createdAt: value.createdAt,
        };
        return item;
      });
      return send.SuccessWithArrayOfObjects(res, data);
    })
    .catch((error) => {
      Logger.error('getAllUsers', error.message);
      return send.ErrorInternal(res);
    });
};

const getUserByID = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!IsValidObjectId(id)) {
    send.ErrorParam(res);
    return;
  }

  User.findById(new Types.ObjectId(id))
    .exec()
    .then((result) => {
      if (!result) {
        send.AccountNotFound(res);
        return;
      }

      const data: ResponseUserInfo = {
        id: result.id,
        email: result.email,
        createdAt: result.createdAt,
      };
      send.SuccessWithObject(res, data);
      return;
    })
    .catch((error) => {
      Logger.error('getUserByID', error.message);
      send.Error(res);
      return;
    });
};

const deleteUserByID = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!IsValidObjectId(id)) {
    send.ErrorParam(res);
    return;
  }

  User.findByIdAndDelete(new Types.ObjectId(id))
    .exec()
    .then((result) => {
      if (!result) {
        send.AccountNotFound(res);
        return;
      }
      send.Success(res);
      return;
    })
    .catch((error) => {
      Logger.error('getUserByID', error.message);
      send.ErrorInternal(res);
      return;
    });
};

export default { getAllUsers, createUser, updateUser, getUserByID, deleteUserByID };
