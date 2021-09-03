'use strict';

const base64 = require('base-64');  //encode and decode pass and username
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();

  let [username, password] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(username, password);
    next();
  } catch (e) {
    _authError()
  }
};

function _authError(req, res, next) {
  res.status(403).send('Invalid Login');
}