// /core/models/TicketReply.js
export default (sequelize, DataTypes) => {
  const TicketReply = sequelize.define('TicketReply', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    ticketId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  TicketReply.associate = models => {
    TicketReply.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
    TicketReply.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return TicketReply;
};
