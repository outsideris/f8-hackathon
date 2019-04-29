module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define('Subscriptions', {
    authorId: {
      type: DataTypes.INTEGER,
    },
    goodId: {
      type: DataTypes.INTEGER,
    },
    onGoing: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'subscriptions',
    timestamps: true,
    paranoid: false,
  });

  return Subscriptions;
};
