// /core/models/BlogComment.js
export default (sequelize, DataTypes) => {
  const BlogComment = sequelize.define('BlogComment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  BlogComment.associate = models => {
    BlogComment.belongsTo(models.User, { foreignKey: 'userId' });
    BlogComment.belongsTo(models.BlogPost, { foreignKey: 'postId' });
  };

  return BlogComment;
};
