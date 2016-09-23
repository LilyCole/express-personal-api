console.log("Sanity Check: JS is working!");

$(document).ready(function(){

	$.ajax({
		method: 'GET',
		url: 'api/places',
		success: function(data) {
			for(var i=0; i<data.length;i++){
				var place = data[i];
				$('#places').append('<strong>Description:</strong> '+place.description+'<br>');
				$('#places').append('<strong>Place:</strong>'+place.town+', '+place.state+', '+place.country+'<br>');
			}
		}
	})

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

  	function newPlaceSuccess(data) {

  		$('#places').append('<strong>Description:</strong> '+data.description+'<br>');
		$('#places').append('<strong>Place:</strong>'+data.town+', '+data.state+', '+data.country+'<br>');
  	};

  	function newPlaceError(err) {
  		console.log(err);
  	};
});
