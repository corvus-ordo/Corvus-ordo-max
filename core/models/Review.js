// /core/models/Review.js
export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT
    }
  });

  Review.associate = models => {
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Publication, { foreignKey: 'publicationId' });
  };

  return Review;
};
