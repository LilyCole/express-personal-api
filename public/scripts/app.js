console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var source = $('#place-info').html();
  var template = Handlebars.compile(source); 
  var allPlaces = [];

  // AJAX to show profile Image and Information
  $.ajax({
    method: 'GET',
    url: 'api/profile',
    success: showProfile,
    error: handleError
  });

  // AJAX GET to show all places that I've lived
  $.ajax({
    method: 'GET',
    url: 'api/places',
    success: showPlaces,
    error: handleError
  })

  // When user clicks "Add New Place" button, submit AJAX POST request to create a new Place
  $('#newPlaceForm').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/places',
        data: $(this).serializeArray(),
        success: newPlaceSuccess,
        error: handleError
      });
    });

  // When user click on "Delete" button for specific Place, AJAX DELETE request to destroy specific Place
  $('#places').on('click', '.deleteButton', function() {
    console.log("this:",this);
    console.log('clicked delete button to', '/api/books/'+$(this).attr('id'));
    // console.log('data,'+$(this).serializeArray());
    $.ajax({
      method: 'DELETE',
      url: '/api/places/'+$(this).attr('id'),
      data: $(this).serializeArray(),
      success: deletePlace,
      error: handleError
    });
  });

  // Show Profile Success
  function showProfile(data) {
    var profileSource = $('#profile-info').html();
    var profileTemplate = Handlebars.compile(profileSource);  
    var profileInfoHtml = profileTemplate(data[0]);
    $('#profile').append(profileInfoHtml);
  }

  // Show Places Success
  function showPlaces(data) {  
    allPlaces = data;
    var placeHtml = template({ place: data});
    $('#places').append(placeHtml);
  }

  // Delete Place Success
  function deletePlace(data) {
    console.log("data",data)
    var placeId = data._id;
    // var elementId = '#'+data._id;
    // console.log('delete place', placeId);
    // $('#places').remove(elementId);
    console.log('delete place', placeId);
    for(var index = 0; index < allPlaces.length; index++) {
      if(allPlaces[index]._id === placeId) {
        allPlaces.splice(index, 1);
        break;  
      }
    }
    render();
  }

  // New Place Success
  function newPlaceSuccess(data) {
    // $('#places').append('<strong>Description:</strong> '+data.description+'<br>');
    // $('#places').append('<strong>Place:</strong>'+data.town+', '+data.state+', '+data.country+'<br>');
    // console.log("newPlace data",data);
    // var source = $('#place-info').html();
    // var template = Handlebars.compile(source);  
    // var placeHtml = template({place: data});
    // $('#places').append(placeHtml);
    allPlaces.push(data);
    render();
  };

  // Handle Error
  function handleError(err) {
    console.log(err);
  };

  // Helper Function Render to Remove All And Re-Render List
  function render () {
    $('#places').empty();
    var placesHTML = template({ place: allPlaces });
    $('#places').append(placesHTML);
  }

});
