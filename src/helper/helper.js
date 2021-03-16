const connection = require("../config");

module.exports = {
  actionQuery: (...argument) => {
    return new Promise((resolve, reject) => {
      connection.query(...argument, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};
