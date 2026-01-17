// /core/models/Category.js
export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  Category.associate = models => {
    Category.hasMany(models.Publication, { foreignKey: 'categoryId' });
  };

  return Category;
};
