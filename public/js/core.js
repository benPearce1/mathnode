/// <reference path="jquery-2.1.0-vsdoc.js" />
/// <reference path="knockoutout-3.0.0.js" />
$(document).ready(function () {
	var timer = 0;
	var type = "";

	$('#imagerow').hide();
	
	function ProblemSetViewModel() {
		
	};

	function ProblemViewModel() {
		var self = this;
		self.number1 = ko.observable();
		self.number2 = ko.observable();
		self.operator = ko.observable();
		self.useranswer = ko.observable();
		self.answer = ko.observable();
		self.correct = ko.computed(function () {
			var isCorrect = self.answer() == self.useranswer();
			console.log(self.answer());
			console.log(self.useranswer());
			console.log(isCorrect);
			return isCorrect;

		});
	};
	
	var viewModel = new ProblemViewModel();
	
	$('#additionbtn').click(function () {
		type = "add";
		getNewProblem(type, viewModel);
	});

	$('#answer').keydown(function (e) {
		console.log('key pressed: ' + e.keyCode)
		if (e.keyCode == 13) {
			$('#correct').hide();
			getNewProblem(type, viewModel);
		}
	});

	ko.applyBindings(viewModel);
});

function getNewProblem(type, viewModel)
{
	$('#message').hide();
	var problemSection = $('#problem');
	problemSection.hide(function() {
		$.getJSON(type, function (data) {
			viewModel.number1(data.number1);
			viewModel.number2(data.number2);
			viewModel.answer(data.answer);
			viewModel.useranswer('');
			viewModel.operator(data.operator);

			problemSection.show("slow");
			$('#imagerow').show();
			$('#answer').focus();
		});	
	});
}

function subtraction()
{
	
}