// /core/models/Payment.js
export default (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false // np. 'stripe', 'p24', 'payu'
    },
    providerPaymentId: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending' // pending, paid, failed, refunded
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    rawResponse: {
      type: DataTypes.JSONB
    }
  });

  Payment.associate = models => {
    Payment.belongsTo(models.Order, { foreignKey: 'orderId' });
  };

  return Payment;
};
