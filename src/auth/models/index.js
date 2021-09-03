'use strict';

require('dotenv').config();
const POSTGRES_URI =
  process.env.POSTGRES_URI ||
  "postgres://qabauxrd:xiMN8Jlf2zhbmVraUNIymntOqofG_ywk@tai.db.elephantsql.com/qabauxrd";

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');
const inputModel = require('./input/model');
const Collection = require('./input/collection')

const DATABASE_URL = process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const input = inputModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
  input: new Collection(input)
};