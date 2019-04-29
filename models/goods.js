'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goods = sequelize.define('Goods', {
    images: {
      type: DataTypes.ARRAY(DataTypes.BLOB),
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

  return Goods;
};
