module.exports = (sequelize, DataTypes) => {
  const Authors = sequelize.define('Authors', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'authors',
    timestamps: true,
    paranoid: false,
  });

  Authors.signin = async function signin(a) {
    const user = await this.findOne({ where: { contact: a.contact } });
    if (user) {
      const d = await user.update(a);
      return d;
    }

    const d = await this.build(a).save();
    return d;
  };

  Authors.list = async function list(g) {
    return this.findAll({
      order: [['id', 'DESC']],
      include: [ { all: true }]
    });
  };

  return Authors;
};
