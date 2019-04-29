module.exports = (sequelize, DataTypes) => {
  const Goods = sequelize.define('Goods', {
    imagePaths: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    priceUnit: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'goods',
    timestamps: true,
    paranoid: false,
  });

  Goods.register = async function register(g) {
    const d = await this.build(g).save();
    return d;
  };

  Goods.list = async function list(g) {
    return this.findAll({
      order: [['id', 'DESC']],
      include: [ { all: true }]
    });
  };

  Goods.get = async function get(id) {
    return this.findOne({
      where: { id },
      include: [ { all: true }]
    });
  };

  Goods.prototype.modify = async function modify(g) {
    const d = await this.update(g);
    return d;
  };

  Goods.prototype.remove = async function remove() {
    await this.destroy();
  };

  return Goods;
};
