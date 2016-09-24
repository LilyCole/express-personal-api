console.log("Sanity Check: JS is working!");

$(document).ready(function(){

    var profileSource = $('#profile-img').html();
    var profileTemplate = Handlebars.compile(profileSource);	

	// AJAX GET to show all places that I've lived
	$.ajax({
		method: 'GET',
		url: 'api/places',
		success: function(data) {
			for(var i=0; i<data.length;i++){
				var place=data[i];
				$('#places').append('<strong>Description:</strong> '+place.description+'<br>');
				$('#places').append('<strong>Place:</strong>'+place.town+', '+place.state+', '+place.country+'<br>');
			}
		}
	})

	// AJAX to show profile Image and Information
	$.ajax({
		method: 'GET',
		url: 'api/profile',
		success: function(data) {
		    console.log(data[0])
		    var imgSource = $('#profile-img').html();
    		var imgTemplate = Handlebars.compile(imgSource);	
		    var profileImgHtml = imgTemplate(data[0]);
		    $('#profileImg').append(profileImgHtml);
		   	var infoSource = $('#profile-info').html();
    		var infoTemplate = Handlebars.compile(infoSource);	
		    var profileInfoHtml = infoTemplate(data[0]);
		    $('#profileInfo').append(profileInfoHtml);
		}
	});

	// When user clicks "Add New Place" button, submit AJAX POST request to create a new Place
	$('#newPlaceForm').on('submit', function(e) {
	    e.preventDefault();
	    $.ajax({
	      method: 'POST',
	      url: '/api/places',
	      data: $(this).serializeArray(),
	      success: newPlaceSuccess,
	      error: newPlaceError
    	});
  	});

	// New Place Success
  	function newPlaceSuccess(data) {
  		$('#places').append('<strong>Description:</strong> '+data.description+'<br>');
		$('#places').append('<strong>Place:</strong>'+data.town+', '+data.state+', '+data.country+'<br>');
  	};

  	// New Place Error
  	function newPlaceError(err) {
  		console.log(err);
  	};

  	// // Handlebars
  	// var source = $('#developer-li-template').html();
  	// var template = Handlebars.compile(source);
  	// var developerHtml = template({ developers: data.developers });
});
