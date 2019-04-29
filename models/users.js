'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Users',
    timestamps: true,
    paranoid: false,
  });

  User.associate = (models) => {
    // associations can be defined here
  };

  return User;
};
