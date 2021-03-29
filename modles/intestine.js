var mongoose = require("mongoose");
var intestineSchema = new mongoose.Schema({
  hosp: String,
  hospname: String,
  hospaddress: String,
  hospcontact: String,
  date: String,
  age: String,
  remarks: String
});
module.exports = mongoose.model("intestine", intestineSchema);
