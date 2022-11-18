'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Save = exports.UsersModel = void 0;
const mongoose_1 = require('mongoose');
const UsersSchema = new mongoose_1.Schema({
  id: { type: Number, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});
exports.UsersModel = (0, mongoose_1.model)('UsersModel', UsersSchema, 'users');
const Save = () => {
  return new Promise((res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        exports.UsersModel.updateOne(
          { email: 'uid', name: '' },
          { email: 'uid', name: '' },
          { upsert: true },
          (error) => {
            if (error) res(error);
            else res(null);
          }
        );
      } catch (error) {
        res(error);
      }
    })
  );
};
exports.Save = Save;
//# sourceMappingURL=users.js.map
