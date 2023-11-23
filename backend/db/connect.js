
const mongoose = require('mongoose');

const connectDB = async (connectionString) => {
  try {

    await mongoose.connect(connectionString);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;
