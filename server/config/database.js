const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(String(process.env.MONGODB_URI));
    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 