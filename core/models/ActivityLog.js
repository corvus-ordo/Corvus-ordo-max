export default (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    entityId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    before: {
      type: DataTypes.JSON,
      allowNull: true
    },
    after: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });

  ActivityLog.associate = models => {
    ActivityLog.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return ActivityLog;
};
