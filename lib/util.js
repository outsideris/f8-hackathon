const decamelize = require('decamelize');

const DOWNLOAD_PATH = '/upload';

module.exports = {
  postProcess: (response) => {
    const obj = {};
    Object.keys(response).forEach((key) => {
      obj[decamelize(key)] = response[key];

      if (['goods', 'contracts'].includes(key) && response[key]) {
        obj[decamelize(key)] = response[key].map((d) => {
          const obj2 = {};
          Object.keys(d).forEach((key2) => {
            obj2[decamelize(key2)] = d[key2];
          });
          return obj2;
        });
      }

      if (['author'].includes(key) && response[key]) {
        const obj2 = {};
        Object.keys(response[key]).forEach((key2) => {
          obj2[decamelize(key2)] = response[key][key2];
        });
        obj[decamelize(key)] = obj2;
      }
    });

    if (obj.image_paths) {
      obj.image_paths = obj.image_paths.map((i) => `${DOWNLOAD_PATH}${i}`);
    }
    return obj
  },
};
