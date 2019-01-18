module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Contacts', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 2,
          msg: 'Contact name must be minimum of 2 characters',
        },
        notEmpty: {
          args: true,
          msg: 'Contact name cannot be empty',
        },
      },
    },
    phoneNumber: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
      validate: {
        max: {
          args: 11,
          msg: 'Phone number must be maximum of 11 characters',
        },
        notEmpty: {
          args: true,
          msg: 'Phone number cannot be empty',
        },
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Contacts'),
};
