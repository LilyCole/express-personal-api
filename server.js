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
  personalSiteLink: 'https://lilycole.github.io/',
  currentCity: 'San Francisco',
  pets: [{name: 'Goober', type: 'Cat', breed: 'Jerk'}, {name: 'Logan', type: 'Dog', breed: 'Pit Mutt'}]
} ];

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

// '/api' shows all Endpoints
app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "https://warm-plains-40549.herokuapp.com", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, 
      {method: "GET", path: "/api/places", description: "Shows all Places I've lived. Use ?limit=specifiedNumber query to show specified amount of Places."}, 
      {method: "GET", path: "/api/places/:id", description: "Info on a Specific Place"},
      {method: "POST", path: "/api/places/", description: "Add a new Place"}, 
      {method: "DELETE", path: "/api/places/:id", description: "Delete a Specific Place"},
      {method: "PUT", path: "/api/places/:id", description: "Update a Specific Place. Not implemented on the front end."}, 
      {method: "GET", path: "/search", description: "Search for a query string in Place description, town, state or country."} 
    ]
  })
});

// '/api/profile' shows Data about me
app.get('/api/profile', function showProfile(req, res) {
  res.json(newProfile);
});

// '/api/places' shows all Places I've lived. Use ?limit=specifiedNumber query to show specified amount of Places
app.get('/api/places', function showLimitedPlaces(req, res) {
  var limit = req.query.limit;
  var returnPlaces = [{}];
  db.Place.find({}, function(err,places) {
    if(err) { 
        throw (err) 
    } else {
      if(limit) {
        if(limit>places.length) {
          limit=places.length
        }
        for(var i = 0; i < limit; i++) {
          returnPlaces.push(places[i]);
        }
        res.json(returnPlaces);
      } else {
        res.json(places);
      }
    }
  })
});

// '/api/places/:id' shows info on a Specific Place
app.get('/api/places/:id', function showPlace(req, res) {
  db.Place.findOne({ _id: req.params.id }, function(err,foundPlace) {
    if(err) { throw (err) };
    res.json(foundPlace);
  })
});

// '/api/places' creates a new Place
app.post('/api/places', function createPlace(req, res) {
  var newPlace = new db.Place({
    description: req.body.description || 'N/A',
    town: req.body.town || 'N/A',
    state: req.body.state || 'N/A',
    country: req.body.country || 'N/A',
    years: req.body.years || 0,
    photo: req.body.image || 'http://pioneerpokerleague.com/wp-content/uploads/2015/02/A-New-Place.png',
    gps: { lat: req.body.lat || 'N/A', long: req.body.long || 'N/A' }
  });
  newPlace.save(function(err, place){
    if (err) { throw (err) };
    res.json(place);
  });
});

// '/api/places/:id' destroys a a Specific Place
app.delete('/api/places/:id', function deletePlace(req, res) {
  db.Place.findByIdAndRemove(req.params.id, function(err, removePlace){
    if (err) { console.log("error from delete:",err) };
    res.json(removePlace);
  });
});

// '/api/places/:id' udpates a a Specific Place
// NOT IMPLEMENTED ON THE FRONT END
app.put('/api/places/:id', function updatePlace(req, res) {
  var updatedPlace = {};
  db.Place.findByIdAndRemove({ _id: req.params.id }, function(err,removePlace) {
    if(err) { throw (err) };
    res.json(removePlace);
  });
  updatedPlace.description = req.body.description,
  updatedPlace.town = req.body.town,
  updatedPlace.state = req.body.state,
  updatedPlace.country = req.body.country,
  updatedPlace.years = req.body.years,
  updatedPlace.photo = req.body.image,
  updatedPlace.gps.lat = req.body.lat,
  updatedPlace.gps.long = req.body.long
  updatedPlace.save(function(err, place){
    if (err) { throw (err) };
    res.json(place);
  });
});

// '/api/search' searches description, town, state and country of a Place and returns the Place if it contains the query
app.get('/search', function searchPlaces(req, res) {
  var query = req.query.q;
  var foundPlaces = [{search: 'results'}];
  db.Place.find({}, function(err,places) {
    if(err) { 
      throw (err) 
    } else {
      places.forEach(function(place,index) {
        if( (place.description.indexOf(query) !== -1) ||
            (place.town.indexOf(query) !== -1) ||
            (place.state.indexOf(query) !== -1) ||
            (place.country.indexOf(query) !== -1)) {
          foundPlaces.push(place);
        }
      });
      res.json(foundPlaces)
    }
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

module.exports = newProfile;
