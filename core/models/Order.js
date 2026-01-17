// /core/models/Order.js
export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending' // pending, paid, shipped, completed, cancelled
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });

  Order.associate = models => {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
    Order.hasOne(models.Payment, { foreignKey: 'orderId' });
  };

  return Order;
};

deliveryId: {
  type: DataTypes.UUID,
  allowNull: true
}
