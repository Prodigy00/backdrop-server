const { DBNAME, DBPASSWORD, DBUSER } = require('./env');
const mongoose = require('mongoose');

const DBURI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.pzqft.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  keepAlive: true,
};

const database = async () => {
  try {
    const dbConnected = await mongoose.connect(DBURI, options);

    const connected = dbConnected.connections[0].states.connected;

    if (!!connected) {
      console.log(`Database connected!`);
    }
  } catch (error) {
    console.error(`DB_CONNECTION_ERR:`, error);
  }
};

module.exports = database;
