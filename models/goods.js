const { Enum } = require('enumify');
const Sequelize = require('sequelize');

class Category extends Enum {}
Category.initEnum(['produce', 'livestock']);

module.exports = (sequelize, DataTypes) => {
  const Goods = sequelize.define('Goods', {
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    category: {
      type: DataTypes.ENUM,
      values: Category.enumValues.map(s => s.name),
      allowNull: false,
    },
    available: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    measure: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'goods',
    timestamps: true,
    paranoid: false,
  });

  Goods.Category = Category;

  Goods.register = async function register(g) {
    const d = await this.build(g).save();
    return d;
  };

  Goods.list = async function list(category) {
    return this.findAll({
      where: { category, available: true },
      order: [['id', 'DESC']],
      include: [ { all: true, include: [ { all: true }] } ]
    });
  };

  Goods.listById = async function list(category, userId) {
    return this.findAll({
      where: { category, authorId: userId, available: true },
      order: [['id', 'DESC']],
      include: [ { all: true, include: [ { all: true }] } ]
    });
  };

  Goods.listByLikes = async function list(category, goodIds) {
    return this.findAll({
      where: { category, id: { [Sequelize.Op.in]: goodIds }, available: true },
      order: [['id', 'DESC']],
      include: [ { all: true, include: [ { all: true }] } ]
    });
  };

  Goods.get = async function get(id) {
    return this.findOne({
      where: { id },
      include: [ { all: true } ]
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
