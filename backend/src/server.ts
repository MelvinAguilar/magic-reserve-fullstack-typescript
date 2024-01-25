const dotenv = require('dotenv');
const app = require('./index');
const mongooseConnection = require('./config/mongoose');

// Handling uncaught exceptions (e.g. synchronous errors)
process.on('uncaughtException', (err: any) => {
  console.log('Uncaught Exception!');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config();

mongooseConnection.connect();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handling unhandled promise rejections (e.g. database connection errors)
process.on('unhandledRejection', (err: any) => {
  console.log('Unhandled Rejection!');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
