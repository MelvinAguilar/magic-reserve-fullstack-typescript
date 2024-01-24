const mongoose = require('mongoose');

const connect = () => {
  const dbHost = process.env.DATABASE_HOST || '127.0.0.1';
  const dbPort = process.env.DATABASE_PORT || '27017';
  const dbName = process.env.DATABASE_NAME || 'magic-reserve';
  
  const databaseUrl =
    process.env.DATABASE_URL || `mongodb://${dbHost}:${dbPort}/${dbName}`;

  mongoose.connect(databaseUrl);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => console.log('Connected to MongoDB'));
};

module.exports = { connect };
