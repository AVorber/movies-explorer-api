const {
  PORT = 3000,
  MONGODB_CONNECTION = 'mongodb://localhost:27017/moviesdb',
} = process.env;

module.exports = { PORT, MONGODB_CONNECTION };
