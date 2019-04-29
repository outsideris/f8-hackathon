const decamelize = require('decamelize');

module.exports = {
  postProcess: (response) => {
    const obj = {};
    Object.keys(response).forEach((key) => {
      obj[decamelize(key)] = response[key];
    });
    return obj
  },
};
