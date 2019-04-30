const { Enum } = require('enumify');

class Status extends Enum {}
Status.initEnum(['paid', 'delivery', 'completed']);

module.exports = (sequelize, DataTypes) => {
  const Contracts = sequelize.define('Contracts', {
    authorId: {
      type: DataTypes.INTEGER,
    },
    goodId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM,
      values: Status.enumValues.map(s => s.name),
      allowNull: false,
    },
  }, {
    tableName: 'contracts',
    timestamps: true,
    paranoid: false,
  });

  Contracts.make = async function make(g, authorId) {
    const data = Object.assign({}, {
      authorId,
      goodId: g.id,
      status: Status.paid.name,
    });
    const d = await this.build(data).save();
    return d;
  };

  return Contracts;
};
