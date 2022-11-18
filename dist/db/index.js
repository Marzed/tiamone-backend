'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const users_1 = require('./models/users');
const StartupConnectToDB = () => {
  const connect = () => {
    mongoose_1.default
      .connect(process.env.MONGO)
      .then(() => {
        return console.log(`Successfully connected to DB.`);
      })
      .catch((error) => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();
  mongoose_1.default.connection.on('disconnected', connect);
};
module.exports = {
  StartupConnectToDB,
  // models
  UsersModel: users_1.UsersModel,
  mongoose: mongoose_1.default,
};
//# sourceMappingURL=index.js.map
