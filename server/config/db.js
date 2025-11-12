require('dotenv').config();
const mongoose = require('mongoose');
let MongoMemoryServer;
try {
  MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
} catch (e) {
  MongoMemoryServer = null;
}

const connectDB = async () => {
  const uriFromEnv = process.env.MONGO_URI && process.env.MONGO_URI.replace(/^"|"$/g, '');
  const defaultUri = uriFromEnv ? `${uriFromEnv}/MEAPI` : 'mongodb://localhost:27017/me_api_playground';

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  try {
    await mongoose.connect(defaultUri);
    return;
  } catch (err) {
    console.warn('Primary MongoDB connection failed:', err.message);
    if (MongoMemoryServer) {
      const mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      await mongoose.connect(memUri);
      console.log('Connected to in-memory MongoDB');
      return;
    }
    throw err;
  }
};

module.exports = connectDB;
