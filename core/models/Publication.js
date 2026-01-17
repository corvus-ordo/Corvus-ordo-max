// /core/models/Publication.js
export default (sequelize, DataTypes) => {
  const Publication = sequelize.define('Publication', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    coverUrl: {
      type: DataTypes.STRING
    },
    fileUrl: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Publication.associate = models => {
    Publication.hasMany(models.OrderItem, { foreignKey: 'publicationId' });
  };

  return Publication;
};
