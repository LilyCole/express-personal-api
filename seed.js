// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
// module.exports.Place = require("./models/place.js");

var manila = new db.Place ({
  description: 'Birthplace',
  town: 'Manila',
  state: 'NCR',
  country: 'Philippines',
  years: 2,
  gps: { lat: '14.5995° N', long: '120.9842° E' },
  photo: 'http://i.dailymail.co.uk/i/pix/2016/03/06/12/31B6AD4D00000578-3468418-Retail_therapy_Manila_offers_plenty_of_street_vendors_but_also_b-a-7_1457267560970.jpg'
}); 

manila.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var racine = new db.Place ({
  description: "Mom's Hometown",
  town: 'Racine',
  state: 'WI',
  country: 'USA',
  years: 2,
  gps: { lat: '42.7261° N', long: '87.7829° W' },
  photo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Root_River_Racine_070107.jpg'
}); 

racine.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var newDelhi = new db.Place ({
  description: 'Pre-School',
  town: 'New Delhi',
  state: 'Delhi',
  country: 'India',
  years: 2,
  gps: { lat: '28.6139° N', long: '77.2090° E' },
  photo: 'http://www.pullmanhotels.com/imagerie/destinations/city/new-delhi-1400x788-2.jpg'
}); 

newDelhi.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var woodcliffLake = new db.Place ({
  description: 'First - Fourth Grades',
  town: 'Woodcliff Lake',
  state: 'NJ',
  country: 'USA',
  years: 4,
  gps: { lat: '41.0234° N', long: '74.0665° W' },
  photo: 'https://activerain-store.s3.amazonaws.com/image_store/uploads/8/8/4/4/0/ar116561598704488.jpg'
}); 

woodcliffLake.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var wooster = new db.Place ({
  description: 'Fifth - Seventh Grades',
  town: 'Wooster',
  state: 'OH',
  country: 'USA',
  years: 3,
  gps: { lat: '40.8051° N', long: '81.9351° W' },
  photo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Downtown_Wooster,_Ohio,_overlooking_the_square_and_gazebo.jpg'
}); 

wooster.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var downersGrove = new db.Place ({
  description: 'Eighth Grade - High School',
  town: 'Downers Grove',
  state: 'IL',
  country: 'USA',
  years: 5,
  gps: { lat: '41.8089° N', long: '88.0112° W' },
  photo: 'https://s-media-cache-ak0.pinimg.com/originals/a8/1e/d2/a81ed2b4bc6a01274bde62256ee49e0b.jpg'
}); 

downersGrove.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var milwaukee = new db.Place ({
  description: 'College',
  town: 'Milwaukee',
  state: 'WI',
  country: 'USA',
  years: 4,
  gps: { lat: '43.0389° N', long: '87.9065° W' },
  photo: 'https://s3.amazonaws.com/external_clips/attachments/32066/original/milk.jpg?1415300319'
}); 

milwaukee.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var madison = new db.Place ({
  description: 'Working at Epic',
  town: 'Madison',
  state: 'WI',
  country: 'USA',
  years: 2,
  gps: { lat: '43.0731° N', long: '89.4012° W' },
  photo: 'http://www.moonshinemiles.com/wp-content/uploads/2015/11/mm-madison.jpg'
}); 

madison.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var maui = new db.Place ({
  description: 'WWOOF-ing',
  town: 'Maui',
  state: 'HI',
  country: 'USA',
  years: 0.5,
  gps: { lat: '20.9175° N', long: '156.3258° W' },
  photo: 'http://media-cache-ec0.pinimg.com/736x/72/e6/d6/72e6d66ffc96ce1bf3a14bb5523bde3a.jpg'
}); 

maui.save(function(err, place){
  if (err){ return console.log('Error:', err); }
  console.log('Created new place', place._id)
});

var sanFrancisco = new db.Place ({
  description: 'Current City',
  town: 'San Francisco',
  state: 'CA',
  country: 'USA',
  years: 8,
  gps: { lat: '37.7749° N', long: '122.4194° W' },
  photo: 'https://lonelyplanetimages.imgix.net/a/g/hi/t/9cf024dfd5c0bcb2b17f4785340145ea-san-francisco.jpg?sharp=10&vib=20&w=1200'
}); 

sanFrancisco.save(function(err, place){
  if (err){
    return console.log('Error:', err);
  }
  console.log('Created new place', place._id)
  process.exit(); 
});