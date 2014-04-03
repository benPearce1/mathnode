var url = require('url')
/*
 * GET addition page
 */
var numberSetGenerator = require('../numberSetGenerator');
exports.index = function (req, res) {
	var parsedUrl = url.parse(req.url, true);
	var count = parsedUrl.query['c'] || 2;

	var numberSet = [];

	for (i = 0; i < count; i++) {
		var numbers = numberSetGenerator.getPairDescending(1, 10);
		numberSet.push({
			number1: numbers.number1,
			number2: numbers.number2,
			answer: numbers.number1 * numbers.number2,
			operator: 'x'
		});
	}

	res
	res.json(numberSet);
};