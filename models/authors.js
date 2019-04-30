module.exports = (sequelize, DataTypes) => {
  const Authors = sequelize.define('Authors', {
    name: {
      type: DataTypes.STRING,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.TEXT,
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
