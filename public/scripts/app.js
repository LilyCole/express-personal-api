console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  var source = $('#place-info').html();
  var template = Handlebars.compile(source); 

  // AJAX GET to show profile Image and Information
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
        success: newPlace,
        error: handleError
      });
    });

  // When user click on "Delete" button for specific Place, AJAX DELETE request to destroy specific Place
  $('#places').on('click', '.deleteButton', function() {
    var endpoint = '/api/places/'+$(this).attr('id');
    $.ajax({
      method: 'DELETE',
      url: endpoint,
      data: $(this).serializeArray(),
      success: deletePlace,
      error: handleError
    });
  });

  // When user click on "Edit" button for specific Place, form appears
  $('#places').on('click', '.editButton', function() {
    var placeId = $(this).attr('id');
    var placeElement = '.'+placeId;
    $(placeElement).append("HI!");
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
    data.forEach(function(value,index) {
      var placeHtml = template(value);
      $('#places').append(placeHtml);
    });
  }

  // New Place Success
  function newPlace(data) {
    var placeHtml = template(data);
    $('#places').append(placeHtml);
    clearFormData();
  };

  // Delete Place Success
  function deletePlace(data) {
    var placeId = data._id;
    var placeElement = '.'+placeId;
    $(placeElement).detach();
  }

  // Handle Error
  function handleError(err) {
    console.log("Err:",err);
  };

  // Clear Form Data for Clean-Up
  function clearFormData() {
    var formFields = $('#newPlaceForm')[0];
    var formFieldsLength = formFields.length;
    for(var i = 0; i < formFieldsLength-1; i++ ) {
      formFields[i].value = '';
    }
  };
  
});
