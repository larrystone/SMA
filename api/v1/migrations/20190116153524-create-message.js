module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Message content cannot be empty',
        },
      },
    },
    status: {
      type: Sequelize.ENUM('sent', 'read'),
      defaultValue: 'sent',
    },
    sentAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    senderId: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Contacts',
        key: 'phoneNumber',
        as: 'senderId',
      },
    },
    receiverId: {
      type: Sequelize.STRING,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: {
        model: 'Contacts',
        key: 'phoneNumber',
        as: 'receiverId',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Messages'),
};
