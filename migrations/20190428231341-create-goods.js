'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('goods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imagePaths: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      likes: {
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.ENUM,
        values: ['produce', 'livestock'],
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
      },
      available: {
        type: Sequelize.BOOLEAN,
      },
      latitude: {
        type: Sequelize.FLOAT,
      },
      longitude: {
        type: Sequelize.FLOAT,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      priceUnit: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      address: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      authorId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('goods');
  }
};
