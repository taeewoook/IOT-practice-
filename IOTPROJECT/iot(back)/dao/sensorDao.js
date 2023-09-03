const Sensor = require("../models/sensor");

const dao = {
  selectList() {
    console.log();
    const setQuery = {};
    return new Promise((resolve, reject) => {
      Sensor.findAll({
        ...setQuery,
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  insert(params) {
    return new Promise((resolve, reject) => {
      Sensor.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
