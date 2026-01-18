// /core/models/AuditLog.js
export default (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    entityId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  });

  AuditLog.associate = models => {
    AuditLog.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return AuditLog;
};


userEmail: {
  type: DataTypes.STRING,
  allowNull: true
}

await db.AuditLog.create({
  tableName: model.name,
  recordId: instance.id,
  userEmail: req.user?.email || null,
  operation: 'DELETE',
  before: instance.toJSON(),
  after: null
});

