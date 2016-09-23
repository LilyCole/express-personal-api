var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  description: String,
  town: String,
  state: String,
  country: String,
  years: Number,
  gps: { lat: Number, long: Number },
  photo: String
});

var Place = mongoose.model('Place', PlaceSchema);


module.exports = Place;