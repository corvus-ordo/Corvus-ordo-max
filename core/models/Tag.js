// /core/models/Tag.js
export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
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

  Tag.associate = models => {
    Tag.belongsToMany(models.Publication, {
      through: 'PublicationTags',
      foreignKey: 'tagId'
    });
  };

  return Tag;
};
