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

});


//   town: 'Manila',
//   state: 'N/A',
//   country: 'Philippines',
//   years: 2,
//   gps: { lat: 14.5995, long: 120.9842 },
//   photo: