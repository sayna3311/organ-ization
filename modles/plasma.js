var mongoose = require("mongoose");
var plasma = new mongoose.Schema({
  hosp: String,
  hospname: String,
  hospaddress: String,
  hospcontact: String,
  date: String,
  age: String,
  remarks: String
  // points: int
});
module.exports = mongoose.model("plasma", plasma);
