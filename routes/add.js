
/*
 * GET addition page
 */
var numberSetGenerator = require('../numberSetGenerator');
exports.index = function (req, res) {
	var numbers = numberSetGenerator.getPair(0,10);

	res.json({ 
		number1: numbers.number1,
		number2: numbers.number2,
		answer: numbers.number1 + numbers.number2,
		operator: '+'
	 });
};