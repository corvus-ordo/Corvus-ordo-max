// /core/models/User.js
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  });

  User.associate = models => {
    User.hasMany(models.Order, { foreignKey: 'userId' });
  };

  return User;
};

