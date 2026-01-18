// /core/models/Coupon.js
export default (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('percent', 'fixed'),
      allowNull: false
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    maxUses: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    usedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    }
  });

  Coupon.associate = models => {
    Coupon.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Coupon;
};
