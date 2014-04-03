$(document).ready(function () {
	var type = "";

	//$('#imagerow').hide();

	ko.bindingHandlers.enterKey = {
    	init: function(element, valueAccessor, allBindings, vm) {
        	ko.utils.registerEventHandler(element, "keyup", function(event) {
            	if (event.keyCode === 13) {
                	ko.utils.triggerEvent(element, "change");
 	               valueAccessor().call(vm, vm); //set "this" to the data and also pass it as first arg, in case function has "this" bound
    	        }
            
            	return true;
        	});
    	}         
	};

	function ProblemViewModel() {
		var self = this;
		self.number1 = ko.observable();
		self.number2 = ko.observable();
		self.operator = ko.observable();
		self.useranswer = ko.observable();
		self.answer = ko.observable();
		self.isCurrent = ko.observable();
		self.attempted = ko.computed(function() {
			return self.useranswer() != undefined;
		});
		self.imageUrl = ko.computed(function() {
			if (!self.attempted()) {
				url = "images/current.png";
			} else if (self.correct()) {
				url = "images/correct.png";
			} else if (self.incorrect()) {
				url = "images/incorrect.png";
			} else if (self.isCurrent()) {
				url = "images/current.png";
			} else {
				url = "images/blank.png";
			}
			console.log(url);
			return url;

		});
		self.correct = ko.computed(function () {
			return self.answer() == self.useranswer();
		});		
		self.incorrect = ko.computed(function() {
			if (self.answer() == undefined) {
				answerLength = 0;
			} else {
				answerLength = self.answer().toString().length;
			}

			if (self.useranswer() == undefined) {
				useranswerLength = 0;
			} else {
				useranswerLength = self.useranswer().toString().length;
			}

			var lengthEqualOrGreater =  useranswerLength >= answerLength;
			var notcorrect = !self.correct();
			var notNull = self.useranswer() != undefined;
			var wrong = notNull && lengthEqualOrGreater && notcorrect;
			return wrong;
		});
		self.toString = ko.computed(function() {
			return self.number1() + ' ' + self.operator() + ' ' + self.number2() + ' = ' + self.answer();
		});
		self.nextProblem = function() {
			getNextProblem(type, viewModelSet);
		};
	};

	function ProblemSetViewModel() {
		var self = this;
		self.set = ko.observableArray();
		self.add = function (number1, number2, operator, answer) {
			var problemVm = new ProblemViewModel();
			problemVm.number1(number1);
			problemVm.number2(number2);
			problemVm.operator(operator);
			problemVm.answer(answer);
			self.set().push(problemVm)
		};
		self.clear = function(){
			self.set.removeAll();
			self.startTime(moment());
			self.calculateElapsed();
		};
		self.current = ko.observable();
		self.currentCount = ko.observable(0);
		self.startTime = ko.observable(moment());
		self.elapsedTime = ko.observable();
		self.calculateElapsed = function(){
			// end = moment();
			// time = moment.preciseDiff(end, self.startTime());
			// console.log(time);
			// self.elapsedTime(time());
		};
		self.finished = false;
	};

	$('#additionbtn').on('click', function () {
		type = "add";
		restart(type, viewModelSet);
	});

	$('#subtractbtn').click(function () {
		type = "sub";
		restart(type, viewModelSet);
	});

	$('#multplicationbtn').click(function () {
		type = 'mult';
		restart(type, viewModelSet);
	});

	$('#startagain').click(function() { 
		restart(type, viewModelSet);
	});

	viewModelSet = new ProblemSetViewModel();
	ko.applyBindings(viewModelSet);
});

function restart(type,viewModelSet) {
	viewModelSet.clear();
	getNextProblem(type,viewModelSet);
	$('#problemset').show();
}	

function getNextProblem(type, viewModelSet)
{
	$('#message').hide();
	$('#problem').hide();
	var setLength = viewModelSet.set().length;
	if(setLength == 0) {
		getNewProblemSet(type, viewModelSet, function() {
			moveToNextProblem(type, viewModelSet);
		});
	}
	else if (viewModelSet.currentCount() > setLength - 1) {
		// viewModelSet.current().finished = true;
		// $('#problemset').hide();
		// $('#review').show();
		getNewProblemSet(type, viewModelSet, function() {
			moveToNextProblem(type, viewModelSet);
		});
	}
	else {
		moveToNextProblem(type, viewModelSet);
	}
}

function moveToNextProblem(type, viewModelSet) {
	viewModelSet.calculateElapsed();
	if(viewModelSet.currentCount >= viewModelSet.set().length) {
		viewModelSet.currentCount(0);
	}
	if (viewModelSet.current() != undefined) {
		viewModelSet.current().isCurrent(false);
	};
	
	viewModelSet.current(viewModelSet.set()[viewModelSet.currentCount()]);
	viewModelSet.currentCount(viewModelSet.currentCount() + 1);
	viewModelSet.current().isCurrent(true);
	console.log('setting current problem to ' + viewModelSet.current().toString());
	$('#problem').show("slow");
	$('#imagerow').show();
	$('#answer').focus();
} 

function getNewProblemSet(type, viewModel, callback)
{
	$.getJSON(type + '?c=5', function (data) {
		console.log(viewModelSet.startTime());
		console.log(viewModelSet.elapsedTime());
		viewModel.clear();
		for (var i in data) {
			viewModel.add(data[i].number1, data[i].number2, data[i].operator, data[i].answer);
		}
		console.log('got ' + data.length + ' problems');

		viewModel.currentCount(0);
		callback();
	});
}
