'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthSignUp = void 0;
const users_1 = require('../../db/models/users');
const AuthSignUp = (req, res) => {
  (0, users_1.Save)();
  res.send({ status: 'success' });
  return;
};
exports.AuthSignUp = AuthSignUp;
//# sourceMappingURL=sign-up.js.map
