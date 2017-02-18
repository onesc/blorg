var express = require('express');
var router = express.Router();
var request = require('request');

var getContent = function() {
  return new Promise((resolve, reject) => {
    request('https://api.myjson.com/bins/1gfc5h', (err, res, body) => {
      if (err) {
        reject(err); return;
      }
      resolve(body);
    });
  });
}

var getContentMiddleware = function(req, res, next) {
	var content = getContent().then(function(json) {
		res.locals.content = json;
		next();	
	});	
}

router.get('/', getContentMiddleware, function(req, res, next) {
  res.render('index', { title: 'Express'});
});

module.exports = router;
