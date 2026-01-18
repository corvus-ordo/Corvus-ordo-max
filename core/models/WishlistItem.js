// /core/models/WishlistItem.js
export default (sequelize, DataTypes) => {
  const WishlistItem = sequelize.define('WishlistItem', {
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
    }
  });

  WishlistItem.associate = models => {
    WishlistItem.belongsTo(models.User, { foreignKey: 'userId' });
    WishlistItem.belongsTo(models.Publication, { foreignKey: 'publicationId' });
  };

  return WishlistItem;
};
