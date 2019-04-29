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

  Users.signin = async function signin(u) {
    // TODO: prevent to save duplicated user
    const d = await this.build(u).save();
    return d;
  };

  Users.list = async function list(g) {
    return this.findAll({
      order: [['id', 'DESC']],
      include: [ { all: true }]
    });
  };

  return Users;
};
