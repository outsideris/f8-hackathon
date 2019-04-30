'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    authorId: {
      type: DataTypes.INTEGER,
    },
    goodId: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'likes',
    timestamps: true,
    paranoid: false,
  });

  Likes.like = async function like(goodId) {

    const d = await this.build({ goodId }).save();
    return d;
  };

  return Likes;
};
