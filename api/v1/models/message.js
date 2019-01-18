export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Message content cannot be empty',
        },
      },
    },
    status: {
      type: DataTypes.ENUM('sent', 'read'),
      defaultValue: 'sent',
    },
    sentAt: {
      type: DataTypes.DATE,
    },
    senderId: {
      type: DataTypes.STRING,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Contacts',
        key: 'phoneNumber',
        as: 'senderId',
      },
    },
    receiverId: {
      type: DataTypes.STRING,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: {
        model: 'Contacts',
        key: 'phoneNumber',
        as: 'receiverId',
      },
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: (message) => {
        message.sentAt = Date(); //eslint-disable-line
      },
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      foreignKey: 'senderId', as: 'sender',
    });
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiverId', as: 'receiver',
    });
  };
  return Message;
};
