/// <reference path="jquery-2.1.0-vsdoc.js" />
/// <reference path="knockoutout-3.0.0.js" />
$(document).ready(function () {
	var timer = 0;
	var type = "";
	var currentProblem = 0;

	$('#imagerow').hide();

	function ProblemViewModel() {
		var self = this;
		self.number1 = ko.observable();
		self.number2 = ko.observable();
		self.operator = ko.observable();
		self.useranswer = ko.observable();
		self.answer = ko.observable('');
		self.correct = ko.computed(function () {
			var isCorrect = self.answer() == self.useranswer();
			return isCorrect;
		});
	};

	function ProblemSetViewModel() {
		var self = this;
		self.set = ko.observableArray()
		self.add = function (number1, number2, operator, answer) {
			var problemVm = new ProblemViewModel();
			problemVm.number1(number1);
			problemVm.number2(number2);
			problemVm.operator(operator);
			problemVm.answer(answer);
			self.set.push(problemVm)
		}
	};

	var viewModelSet = new ProblemSetViewModel();
	var viewModel = new ProblemViewModel(); ;

	$('#additionbtn').click(function () {
		type = "add";
		getNextProblem(type, viewModelSet, viewModel, currentProblem);
	});

	$('#subtractbtn').click(function () {
		type = "sub";
		getNextProblem(type, viewModel);
	});

	$('#answer').keydown(function (e) {
		if (e.keyCode == 13) {
			$('#correct').hide();
			getNextProblem(type, viewModelSet, viewModel, currentProblem);
		}
	});

	ko.applyBindings(viewModel);
});


function getNextProblem(type, viewModelSet, currentViewModel, currentProblem)
{
	if(currentProblem >= viewModelSet.set().length)	
	{
		getNewProblemSet(type, viewModelSet);
		currentProblem = 0;
	}
	currentViewModel = viewModelSet.set()[currentProblem];
	//currentViewModel.number1(viewModelSet.set()[currentProblem].number1);
	//currentViewModel.number2(viewModelSet.set()[currentProblem].number2);
	//currentViewModel.operator(viewModelSet.set()[currentProblem].operator);
	//currentViewModel.answer(viewModelSet.set()[currentProblem].answer);
	//currentViewModel.useranswer('');
	currentProblem++;
}

function getNewProblemSet(type, viewModel)
{
	$('#message').hide();
	var problemSection = $('#problem');
	problemSection.hide(function () {
		$.getJSON(type, function (data) {
			console.log(data);
			for (var i in data) {
				viewModel.add(data[i].number1, data[i].number2, data[i].operator, data[i].answer);
			}
			//viewModel.number1(data[0].number1);
			//viewModel.number2(data[0].number2);
			//viewModel.answer(data[0].answer);
			//viewModel.useranswer('');
			//viewModel.operator(data.operator[0]);
			problemSection.show("slow");
			$('#imagerow').show();
			$('#answer').focus();
		});
	});
}
