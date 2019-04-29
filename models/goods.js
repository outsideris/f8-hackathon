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
    contact: {
      type: DataTypes.TEXT,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
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
    price: {
      type: DataTypes.FLOAT,
    },
    priceUnit: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    address: {
      type: DataTypes.STRING,
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
