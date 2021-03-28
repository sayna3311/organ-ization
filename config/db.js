const mongoose = require("mongoose");

const connectDB = async () => {

  MONGO_URI = 'mongodb+srv://Sayna0103:Sayna0103@cluster0.60vqp.mongodb.net/graft?retryWrites=true&w=majority';

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log(`MONGODB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);

    process.exit(1);
  }
};

module.exports = connectDB;
