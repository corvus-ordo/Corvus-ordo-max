// /core/models/Role.js
export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
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

  Role.associate = models => {
    Role.hasMany(models.User, { foreignKey: 'roleId' });
  };

  return Role;
};
