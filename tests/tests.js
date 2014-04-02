

test("hello test", function () {
    ok(1 == "1", "Passed!");
});

test('timer on problemset', function() {
	// arrange
	vm = new ProblemSetViewModel();

	var start = vm.startTime();
	// act
	setTimeout(function() { 
		var endTime = vm.endTime();
	}, 2000);

	// assert
	ok(1 == "2", endTime);
});