var mongoose = require("mongoose");
var heart = new mongoose.Schema({
  hosp: String,
  hospname: String,
  hospaddress: String,
  hospcontact: String,
  date: String,
  age: String,
  remarks: String
  // points: int
});
module.exports = mongoose.model("heart", heart);
