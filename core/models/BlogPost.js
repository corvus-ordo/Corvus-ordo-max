// /core/models/BlogPost.js
export default (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      defaultValue: 'draft'
    }
  });

  BlogPost.associate = models => {
    BlogPost.belongsToMany(models.BlogTag, {
      through: 'BlogPostTags',
      foreignKey: 'postId'
    });
    BlogPost.hasMany(models.BlogComment, { foreignKey: 'postId' });
  };

  return BlogPost;
};
