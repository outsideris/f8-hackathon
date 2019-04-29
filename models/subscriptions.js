module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define('Subscriptions', {
    userId: {
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

  Subscriptions.associate = (models) => {
    // associations can be defined here
  };

  return Subscriptions;
};
