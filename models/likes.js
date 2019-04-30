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
    const has = await this.findOne({ where: { authorId, goodId } });
    if (!has) {
      const d = await this.build({ authorId, goodId }).save();
      return d;
    }

    return has;
  };

  Likes.unlike = async function unlike(authorId, goodId) {
    const has = await this.findOne({ where: { authorId, goodId } });
    if (has) {
      await has.destroy();
    }
  };

  Likes.findById = async function findById(authorId) {
    const list = await this.findAll({ where: { authorId } });
    return list;
  };

  return Likes;
};
