<html>
<h1>Express Personal API</h1>

<h2>Technical Requirements</h2>

<p>Per Class Guidelines, the application must incorporate:
<ul>
<li>Well-documented JSON API Endpoints</li>
<li>A full set of REST-ful Routes (GET, POST, UPDATE, DELETE)</li>
<li>At least one CRUD-able resource (Create, Read, Update, Destroy)</li>
<li>An /api/profile endpoint with some basic details about you</li>
</ul>
</p>

<h2>My JSON API Endpoints (In server.js)</h2>

<h3>&#8226; method: "GET", path: "/api"</h3>
JSON describes all available endpoints
<h3>&#8226; method: "GET", path: "/api/profile"</h3>
JSON shows data about me 
<h3>&#8226; method: "GET", path: "/api/places"</h3>
JSON shows all Places I've lived. Use ?limit=specifiedNumber query to show specified amount of Places.
<h3>&#8226; method: "GET", path: "/api/places/:id"</h3>
JSON shows info on a Specific Place
<h3>&#8226; method: "POST", path: "/api/places/"</h3>
adds a new Place and returns new JSON with _id
<h3>&#8226; method: "DELETE", path: "/api/places/:id"</h3>
deletes a Specific Place
<h3>&#8226; method: "PUT", path: "/api/places/:id"</h3>
updates a Specific Place and returns new JSON with _id. 
<h3>&#8226; method: "GET", path: "/search"</h3>
searches description, town, state and country of a Place and returns JSONs of Places that contain query string


<h2>My AJAX Display Endpoints (In app.js)</h2>

<h3>showProfile()</h3>
uses Handlebars to iterate through hard-coded Profile and display on index.html
<h3>showPlaces()</h3>
users Handlebars to iterate through all Places in db and show on index.html
<h3>addUpdateListener()</h3>
adds Event Listener for UPDATE button once the form is present on page

<h2>Helper Functions (In app.js)</h2>

<h3>toggleEditForm()</h3>
shows or hides Edit/Update form when the Edit button is pressed
<h3>clearFormData()</h3>
clears the values from Add New Place form after new Place is added
<h3>newPlace()</h3>
appends the new Place with Handlebars to the current Pace List, clears form data
<h3>deletePlace()</h3>
finds specified deleted Place and detaches it from the Place List
<h3>updatePlace()</h3>
finds specified Place and updates desired information

<h2>My Schemas</h2>

<h3>Place</h3>
<p><strong>Attributes:</strong>
<ul>
<li>description: String</li>
<li>town: String</li>
<li>state: String</li>
<li>country: String</li>
<li>years: Number</li>
<li>gps: { lat: String, long: String }</li>
<li>photo: String</li>
</ul>
</p>