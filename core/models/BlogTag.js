// /core/models/BlogTag.js
export default (sequelize, DataTypes) => {
  const BlogTag = sequelize.define('BlogTag', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  BlogTag.associate = models => {
    BlogTag.belongsToMany(models.BlogPost, {
      through: 'BlogPostTags',
      foreignKey: 'tagId'
    });
  };

  return BlogTag;
};
