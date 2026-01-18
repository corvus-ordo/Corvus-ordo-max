import db from './index.js';

export function registerAuditHooks() {
  const models = db;

  Object.values(models).forEach(model => {
    if (!model || !model.name || model.name === 'AuditLog') return;

    // CREATE
    model.addHook('afterCreate', async (instance, options) => {
      await db.AuditLog.create({
        tableName: model.name,
        recordId: instance.id,
        userId: options.userId || null,
        operation: 'CREATE',
        before: null,
        after: instance.toJSON()
      });
    });

    // UPDATE
    model.addHook('beforeUpdate', async (instance, options) => {
      instance._previousData = instance._previousDataValues;
    });

    model.addHook('afterUpdate', async (instance, options) => {
      await db.AuditLog.create({
        tableName: model.name,
        recordId: instance.id,
        userId: options.userId || null,
        operation: 'UPDATE',
        before: instance._previousData,
        after: instance.toJSON()
      });
    });

    // DELETE
    model.addHook('beforeDestroy', async (instance, options) => {
      await db.AuditLog.create({
        tableName: model.name,
        recordId: instance.id,
        userId: options.userId || null,
        operation: 'DELETE',
        before: instance.toJSON(),
        after: null
      });
    });
  });
}
