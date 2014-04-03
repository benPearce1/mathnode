

test("hello test", function () {
    ok(1 == "1", "Passed!");
});

// test('timer on problemset', function() {
// 	// arrange
// 	vm = new ProblemSetViewModel();

// 	var start = vm.startTime();
// 	// act
// 	setTimeout(function() { 
// 		var endTime = vm.endTime();
// 	}, 2000);

// 	// assert
// 	ok(1 == "2", endTime);
// });

test('getPairAscending', function() { 
	var numberSetGen = new numberSetGenerator();
	for (var i = 0 ; i <= 100; i--) {
		var numbers = numberSetGenerator.getPairAscending(1,100);
		ok(numbers.number1 >= numbers.number2, "Passed!");
	}

});