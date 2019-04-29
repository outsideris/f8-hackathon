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

  Goods.associate = (models) => {
    // associations can be defined here
  };

  Goods.register = async function register(g) {
    const d = await this.build(g).save();
    return d;
  };

  return Goods;
};
