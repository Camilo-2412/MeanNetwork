const moongose = require("mongoose");

const dbConnection = async () => {
  try {
    await moongose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with to MongoDB: ON");
  } catch (e) {
      console.log("Error connecting to MongoDB: ", e);
      throw new Error("Error connecting to MongoDB: ")
  }
};

module.exports = {dbConnection};