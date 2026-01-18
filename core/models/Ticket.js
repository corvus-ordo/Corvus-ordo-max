// /core/models/Ticket.js
export default (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'closed'),
      defaultValue: 'open'
    }
  });

  Ticket.associate = models => {
    Ticket.belongsTo(models.User, { foreignKey: 'userId' });
    Ticket.hasMany(models.TicketReply, { foreignKey: 'ticketId' });
  };

  return Ticket;
};
