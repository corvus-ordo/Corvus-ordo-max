export default (sequelize, DataTypes) => {
  const PublicationRevision = sequelize.define('PublicationRevision', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    publicationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    coverImage: DataTypes.STRING,
    tags: DataTypes.JSON,
    categories: DataTypes.JSON,
    status: {
      type: DataTypes.ENUM('draft', 'revision'),
      defaultValue: 'revision'
    }
  });

  PublicationRevision.associate = models => {
    PublicationRevision.belongsTo(models.Publication, { foreignKey: 'publicationId' });
    PublicationRevision.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return PublicationRevision;
};
