// /core/db/index.js
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false
});

const db = {};

const modelsPath = path.join(__dirname, '../models');
const files = fs.readdirSync(modelsPath).filter(f => f.endsWith('.js'));

for (const file of files) {
  const fullPath = path.join(modelsPath, file);
  const mod = await import(fullPath);
  const modelDef = mod.default;
  const model = modelDef(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.values(db).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

import { registerAuditHooks } from './auditHooks.js';
registerAuditHooks();
