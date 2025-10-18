const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set in environment variables');
  }

  try {
    mongoose.connect(uri)
      .then(() => {
        console.log('Connected to MongoDB Atlas!');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // stop the process - DB is required
  }
};

module.exports = connectDB;