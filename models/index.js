const mongoose = require("mongoose");

mongoose.set('debug', true); //remove in production
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/centron")
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(err => {
    console.log(err)
  })

exports.Product = require("./product");
exports.Store = require("./store");
