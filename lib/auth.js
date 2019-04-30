const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const createError = require('http-errors');

const JWT_SECRET = process.env.SECRET || 'secret';
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

module.exports = {
  issueToken: async (authorId) => {
    const payload = { sub: authorId }
    const token = await sign(payload, JWT_SECRET, {});
    return token;
  },
  verifyToken: async (authorizationHeader) => {
    if (authorizationHeader) {
      const bearers = authorizationHeader.split(' ');
      if (bearers[1]) {
        const decoded = await verify(bearers[1], JWT_SECRET);
        return decoded;
      } else {
        throw createError(401, 'Authentication is failed');
      }
    } else {
      throw createError(401, 'Authentication is failed');
    }
  },

};
