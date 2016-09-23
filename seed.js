// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
// module.exports.Place = require("./models/place.js");

var manila = new db.Place ({
  description: 'Place of Birth',
  town: 'Manila',
  state: 'N/A',
  country: 'Philippines',
  years: 2,
  gps: { lat: 14.5995, long: 120.9842 },
  photo: 'http://i.dailymail.co.uk/i/pix/2016/03/06/12/31B6AD4D00000578-3468418-Retail_therapy_Manila_offers_plenty_of_street_vendors_but_also_b-a-7_1457267560970.jpg'
}); 

manila.save(function(err, place){
  if (err){
    return console.log('Error:', err);
  }
  console.log('Created new place', place._id)
  process.exit(); 
});

var sanFrancisco = new db.Place ({
  description: 'Current City',
  town: 'San Francisco',
  state: 'CA',
  country: 'USA',
  years: 8,
  gps: { lat: 37.7749, long: 122.4194 },
  photo: 'https://lonelyplanetimages.imgix.net/a/g/hi/t/9cf024dfd5c0bcb2b17f4785340145ea-san-francisco.jpg?sharp=10&vib=20&w=1200'
}); 

sanFrancisco.save(function(err, place){
  if (err){
    return console.log('Error:', err);
  }
  console.log('Created new place', place._id)
  process.exit(); 
});