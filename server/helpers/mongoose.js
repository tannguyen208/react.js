var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/study');

function db() { }

db.ProductsModel = mongoose.model("products", new Schema({
  name: String,
  author: String,
  price: Number
}));


module.exports = db;