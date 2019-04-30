module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('goods', 'title'),
    queryInterface.removeColumn('goods', 'description'),
    queryInterface.removeColumn('goods', 'tags'),
    queryInterface.removeColumn('goods', 'address'),
    queryInterface.removeColumn('goods', 'priceUnit'),
    queryInterface.removeColumn('goods', 'imagePaths'),
    queryInterface.addColumn('goods', 'measure', Sequelize.STRING),
    queryInterface.addColumn('goods', 'images', Sequelize.ARRAY(Sequelize.TEXT)),

    queryInterface.removeColumn('authors', 'imageUrl'),
    queryInterface.removeColumn('authors', 'firstName'),
    queryInterface.removeColumn('authors', 'lastName'),
    queryInterface.removeColumn('authors', 'bio'),
    queryInterface.addColumn('authors', 'image', Sequelize.TEXT),
    queryInterface.addColumn('authors', 'name', Sequelize.STRING),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
  ]),
};
