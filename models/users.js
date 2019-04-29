module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
    tableName: 'users',
    timestamps: true,
    paranoid: false,
  });

  Users.associate = (models) => {
    // associations can be defined here
  };

  Users.signin = async function signin(u) {
    // TODO: prevent to save duplicated user
    const d = await this.build(u).save();
    return d;
  };

  return Users;
};
