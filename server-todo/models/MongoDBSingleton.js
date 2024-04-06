const mongoose = require('mongoose');
require('dotenv').config();
let connection;

const connect = () => {
  if (connection) {
    return Promise.resolve(connection);
  }

  return mongoose.connect(process.env.MONGO_URI)
    .then(conn => {
      connection = conn;
      return connection;
    }).catch(err => {
      console.error('Could not connect to MongoDB', err);
      process.exit(1);
    });
};

module.exports = { connect };