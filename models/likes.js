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

  Likes.like = async function like(authorId, goodId) {
    const has = this.findOne({ where: { authorId, goodId } });
    if (!has) {
      const d = await this.build({ authorId, goodId }).save();
      return d;
    }

    return has;
  };

  return Likes;
};
