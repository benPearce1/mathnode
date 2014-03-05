/// <reference path="jquery-2.1.0-vsdoc.js" />
/// <reference path="knockoutout-3.0.0.js" />
$(document).ready(function () {
	var timer = 0;
	var type = "";

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
	ko.applyBindings(viewModel);

	$('#additionbtn').click(function () {
		type = "add";
		$('#message').hide();
		getNewProblem(type, viewModel);

		$('#problem').show("slow");
		$('#answer').focus();
	});

	$('#answer').keydown(function (e) {
		console.log('key pressed: ' + e.keyCode)
		if (e.keyCode == 13) {
			var problemSection = $('#problem');
			problemSection.hide(function () {
				console.log('hide completed');
				getNewProblem(type, viewModel);
				problemSection.show("slow");
				$('#answer').focus();
			});

		}
	});
});

function getNewProblem(type, viewModel)
{
	$.getJSON(type, function (data) {
			viewModel.number1(data.number1);
			viewModel.number2(data.number2);
			viewModel.answer(data.answer);
			viewModel.useranswer('');
			viewModel.operator(data.operator);
		});
}

function subtraction()
{
	
}