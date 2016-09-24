console.log("Sanity Check: JS is working!");

$(document).ready(function(){

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
    var imgSource = $('#profile-img').html();
    var imgTemplate = Handlebars.compile(imgSource);  
    var profileImgHtml = imgTemplate(data[0]);
    $('#profileImg').append(profileImgHtml);
    var infoSource = $('#profile-info').html();
    var infoTemplate = Handlebars.compile(infoSource);  
    var profileInfoHtml = infoTemplate(data[0]);
    $('#profileInfo').append(profileInfoHtml);
  }

  // Show Places Success
  function showPlaces(data) {
    var source = $('#place-info').html();
    var template = Handlebars.compile(source);  
    var placeHtml = template({ place: data});
    $('#places').append(placeHtml);
  }

  // Delete Place Success
  function deletePlace(data) {
    console.log(data)
    var placeId = data._id;
    console.log('delete place', placeId);
    // // find the book with the correct ID and remove it from our allBooks array
    // for(var index = 0; index < allBooks.length; index++) {
    //   if(allBooks[index]._id === bookId) {
    //     allBooks.splice(index, 1);
    //     break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    //   }
    // }
    // render();
  }

  // New Place Success
  function newPlaceSuccess(data) {
    $('#places').append('<strong>Description:</strong> '+data.description+'<br>');
    $('#places').append('<strong>Place:</strong>'+data.town+', '+data.state+', '+data.country+'<br>');
  };

  // Handle Error
  function handleError(err) {
    console.log(err);
  };

});
