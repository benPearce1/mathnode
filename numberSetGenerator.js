exports.getPair = function (min, max) {
	return getPairInternal(min, max);
}

exports.getPairAscending = function(min, max) {
	var numbers = getPairInternal(min,max);
	if (numbers.number1 > numbers.number2)
	{
		temp = numbers.number1;
		numbers.number1 = numbers.number2;
		numbers.number2 = temp;
	}

	return numbers;
}

exports.getPairDescending = function(min, max) {
	var numbers = getPairInternal(min,max);
	if (numbers.number1 < numbers.number2)
	{
		temp = numbers.number1;
		numbers.number1 = numbers.number2;
		numbers.number2 = temp;
	}

	return numbers;	
}

exports.getPairNotEqual = function(min, max) {
	success = false;
	while (!success)
	{
		var numbers = getPairInternal(min,max);
		success = numbers.number1 != numbers.number2;
	}

	return numbers;
}

function getPairInternal(min, max) {
	var number1, number2;
	number1 = getRandomNumber(min, max);
	number2 = getRandomNumber(min, max);

	return { number1: number1, number2: number2 };
}

function getRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(number1, number2) {
	temp = number1;
	number1 = number2;
	number2 = temp;
}


