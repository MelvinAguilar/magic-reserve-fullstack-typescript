const dotenv = require('dotenv');
const app = require('./index');
const mongooseConnection = require('./config/mongoose');

dotenv.config();

mongooseConnection.connect();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
