// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/************************
 * HARDCODED PROFILE DATA *
 ************************/

var newProfile = [ {
  name: 'Lily Cole',
  githubLink: 'https://github.com/LilyCole/',
  githubProfileImage: 'https://avatars2.githubusercontent.com/u/20937116?v=3&s=466',
  personalSiteLink: 'http://www.ToursByLily.com',
  currentCity: 'San Francisco',
  pets: [{name: 'Goober', type: 'Cat', breed: 'Jerk'}, {name: 'Logan', type: 'Dog', breed: 'Pitt Mutt'}]
} ];

// , {name: 'Logan', type: 'Dog', breed: 'Mutt'}
/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "https://warm-plains-40549.herokuapp.com", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, 
      {method: "GET", path: "/api/places", description: "Places I've lived"}, 
      {method: "GET", path: "/api/places/:id", description: "Info on a Specific Place"},
      {method: "POST", path: "/api/places/", description: "Add a new Place"}, 
      {method: "DELETE", path: "/api/places/:id", description: "Delete a Specific Place"}  
    ]
  })
});

app.get('/api/profile', function showProfile(req, res) {
  res.json(newProfile);
});

app.get('/api/places', function showplaces(req, res) {
  db.Place.find({}, function(err,places) {
    if(err) { throw (err) };
    res.json(places);
  })
});

app.get('/api/places/:id', function showPlace(req, res) {
  db.Place.find({ _id: req.params.id }, function(err,foundPlace) {
    if(err) { throw (err) };
    res.json(foundPlace);
  })
});

app.post('/api/places', function createPlace(req, res) {
  // create new place with form data (`req.body`)
  var newPlace = new db.Place({
    description: req.body.description,
    town: req.body.town,
    state: req.body.state,
    country: req.body.country,
    years: req.body.years,
    photo: req.body.image,
    gps: { lat: req.body.lat, long: req.body.long }
  });
  newPlace.save(function(err, place){
    if (err) { throw (err) };
    res.json(place);
  });
});

app.delete('/api/places/:id', function deletePlace(req, res) {
  // remove place
  db.Place.remove({ _id: req.params.id }, function(err, place){
    if (err) { throw (err) };
    console.log("RESPONDING WITH DELETE JSON:",place)
    res.json(place);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

module.exports = newProfile;
