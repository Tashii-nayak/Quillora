const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    console.log("Connected database:", mongoose.connection.name);
    console.log("Collections:", await mongoose.connection.db.listCollections().toArray());
    console.log('MongoDB connected successfully');

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
