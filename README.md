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

<h2>Installation</h2>
<ol>
<li>Fork and clone this repo</li>
<li>CD into created directory</li>
<li>Start up MongoDB
<code>> mongod</code></li>
<li>In a new terminal install Node modules
<code>> npm install</code></li>
<li>Start up your server
<code>> nodemon</code></li>
<li>Navigate to: http://localhost:3000/</li>
<li>CRUD to your heart's content!</li>
</ol>

<h2>Screenshot</h2>
<p>Editing a Location:</p>
<img src='http://i.imgur.com/C0462iE.png'>

<h2>Deployment</h2>
<p>See it deployed on Heroku: <a href='https://warm-plains-40549.herokuapp.com/'>Express Personal API</a></p>

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

<h2>My JSON API Endpoints (In server.js)</h2>

<ul>
<li><strong>method: "GET", path: "/api"</strong></br>
JSON describes all available endpoints</li>
<li><strong>method: "GET", path: "/api/profile"</strong></br>
JSON shows data about me </li>
<li><strong>method: "GET", path: "/api/places"</strong></br>
JSON shows all Places I've lived. Use ?limit=specifiedNumber query to show specified amount of Places.</li>
<li><strong>method: "GET", path: "/api/places/:id"</strong></br>
JSON shows info on a Specific Place</li>
<li><strong>method: "POST", path: "/api/places/"</strong></br>
adds a new Place and returns new JSON with _id</li>
<li><strong>method: "DELETE", path: "/api/places/:id"</strong></br>
deletes a Specific Place</li>
<li><strong>method: "PUT", path: "/api/places/:id"</strong></br>
updates a Specific Place and returns new JSON with _id. </li>
<li><strong>method: "GET", path: "/search"</strong></br>
searches description, town, state and country of a Place and returns JSONs of Places that contain query string</li>
</ul>

<h2>My AJAX Display Endpoints (In app.js)</h2>

<ul>
<li><strong>showProfile()</strong></br>
uses Handlebars to iterate through hard-coded Profile and display on index.html</li>
<li><strong>showPlaces()</strong></br>
users Handlebars to iterate through all Places in db and show on index.html</li>
<li><strong>newPlace()</strong></br>
appends the new Place with Handlebars to the current Place List, clears form data</li>
<li><strong>deletePlace()</strong></br>
finds specified deleted Place and detaches it from the Place List</li>
<li><strong>updatePlace()</strong></br>
finds specified Place and updates desired information. removes all current Places from displays and re-renders.</li>
</ul>

<h2>Helper Functions (In app.js)</h2>

<ul>
<li><strong>toggleEditForm()</strong></br>
shows or hides Edit/Update form when the Edit button is pressed</li>
<li><strong>clearFormData()</strong></br>
clears the values from Add New Place form after new Place is added</li>
<li><strong>addUpdateListener()</strong></br>
adds Event Listener for UPDATE button once the form is present on page</li>
</ul>
