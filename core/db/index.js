// /core/db/index.js
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false,
});

const db = {};

fs.readdirSync(path.join(__dirname, '../models')).forEach(file => {
  const modelDef = require(`../models/${file}`).default;
  const model = modelDef(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
