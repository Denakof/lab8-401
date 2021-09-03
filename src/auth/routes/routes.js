'use strict';

const express = require('express');
const authRouter = express.Router();

const { users, input } = require('../models/index.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl');

authRouter.post('/signup', async (req, res, next) => {
  console.log(req.body);
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message + ' signup error');
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };

  res.status(200).json(user);
});



authRouter.delete("/delete/:id", bearerAuth, permissions("delete"), async (req, res) => {
  const id = parseInt(req.params.id);
  let record = await users.destroy({ where: { id } });
  res.status(200).json(record);
}
);


authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const user = await users.findAll({});
  const list = user.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, permissions('delete'), async (req, res, next) => {
  res.status(200).send('Welcome to the secret area!');
});

authRouter.post('/add', bearerAuth, async (req, res, next) => {

  let tour = tourism.create(req.body);
  res.status(201).json(tour);

});

module.exports = authRouter;