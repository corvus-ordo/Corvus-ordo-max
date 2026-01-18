// /core/models/PushSubscription.js
export default (sequelize, DataTypes) => {
  const PushSubscription = sequelize.define('PushSubscription', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    endpoint: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    p256dh: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    auth: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return PushSubscription;
};
