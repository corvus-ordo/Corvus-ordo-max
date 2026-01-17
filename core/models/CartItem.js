// /core/models/CartItem.js
export default (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    publicationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  CartItem.associate = models => {
    CartItem.belongsTo(models.User, { foreignKey: 'userId' });
    CartItem.belongsTo(models.Publication, { foreignKey: 'publicationId' });
  };

  return CartItem;
};
