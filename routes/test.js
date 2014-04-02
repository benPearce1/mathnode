exports.index = function(req, res){
  res.sendfile('tests/test.html');
};

exports.tests = function(req, res){
	res.sendfile('tests/tests.js');
};