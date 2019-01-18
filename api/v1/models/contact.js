export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 11],
          msg: 'Phone number must be between 5 to 11 characters in length',
        },
        notEmpty: {
          args: true,
          msg: 'Phone number cannot be empty',
        },
      },
    },
  }, {});

  Contact.removeAttribute('id');

  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId', as: 'sender',
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId', as: 'receiver',
    });
  };

  return Contact;
};
