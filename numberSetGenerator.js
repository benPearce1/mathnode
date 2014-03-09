
exports.getPair = function (min, max) {
	var success = false;
	var number1, number2;
	while (!success) {
		number1 = getRandomNumber(min, max);
		number2 = getRandomNumber(min, max);

		if(number1 > 0 || number2 > 0){
			success = true;	
		}
	}

	return { number1: number1, number2: number2 };
}

function getRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}