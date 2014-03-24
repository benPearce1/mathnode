$(document).ready(function () {
	$('#nextbtn').on('click', function() {
		alert('you clicked the button');
	});

	$('#text').on('keyup', function(e) { 
		console.log(e.which);
	});
});