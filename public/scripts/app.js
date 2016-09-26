$(document).ready(function(){

  var source = $('#place-info').html();
  var template = Handlebars.compile(source); 
  var editOpen = false;

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

  // When user click on "Edit" button for specific Place, form appears/disappears
  $('#places').on('click', '.editButton', function() {
    var placeId = $(this).attr('data_id');
    var placeElement = '.'+placeId;
    $.ajax({
      method: 'GET',
      url: 'api/places/' + placeId,
      success: toggleEditForm,
      error: handleError
    });
  });

  // When user click on "Delete" button for specific Place, AJAX DELETE request to destroy specific Place
  $('#places').on('click', '.deleteButton', function() {
    var endpoint = '/api/places/'+$(this).attr('data_id');
    $.ajax({
      method: 'DELETE',
      url: endpoint,
      data: $(this).serializeArray(),
      success: deletePlace,
      error: handleError
    });
  });

  function addUpdateListener() {
    // When user click on "UPDATE" button for specific Place, PUT is called
    $('#editPlaceForm').on('submit', function(e) {
        e.preventDefault();
        var placeId = $(this).attr('data_id');
        $.ajax({
          method: 'PUT',
          url: '/api/places/'+placeId,
          data: $(this).serializeArray(),
          success: updatePlace,
          error: handleError
        });
        editOpen=false;
    });
  }

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

  // Toggle Edit Form On/Off
  function toggleEditForm(data) {
    var placeId = data._id;
    var placeElement = '.'+placeId;
    if(editOpen) {
      $('.editFormRow').detach();
      editOpen = false;
    } else {
      var editSource = $('#edit-place').html();
      var editTemplate = Handlebars.compile(editSource);  
      var editHtml = editTemplate(data);
      $(placeElement).append(editHtml);
      editOpen = true;
      addUpdateListener();
    }
  };

  // Update Place Success
  function updatePlace(data) {
    var placeId = data._id;
    var placeElement = '.'+placeId;
    $('.editFormRow').detach();
    $('.displayPlace').detach();
    $.ajax({
      method: 'GET',
      url: 'api/places',
      success: showPlaces,
      error: handleError
    })
  }

  // Clear Form Data for Clean-Up
  function clearFormData() {
    var formFields = $('#newPlaceForm')[0];
    var formFieldsLength = formFields.length;
    for(var i = 0; i < formFieldsLength-1; i++ ) {
      formFields[i].value = '';
    }
  };

  // Handle Error
  function handleError(err) {
    console.log("Err:",err);
  };
  
});
