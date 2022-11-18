'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const sign_up_1 = require('./routes/auth/sign-up');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { StartupConnectToDB } = require('./db');
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send({ status: 'success' }));
// nginx /auth
app.route('/auth').post(sign_up_1.AuthSignUp).get(sign_up_1.AuthSignUp);
app.listen(process.env.SERVER_PORT, () =>
  console.log('Start API on port: ' + process.env.SERVER_PORT)
);
StartupConnectToDB();
//# sourceMappingURL=app.js.map
