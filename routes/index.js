var express = require('express');
var router = express.Router();
var request = require('request');
var cache = require('memory-cache');

var getContent = function() {
  return new Promise((resolve, reject) => {
    request('https://api.myjson.com/bins/19j51l', (err, res, body) => {
      if (err) {
        reject(err); return;
      }
      cache.put('content', body, (5 * 60 * 1000)); // store it in memory cache for 5 minutes
      resolve(body);
    });
  });
}

var getContentMiddleware = function(req, res, next) {
  var cachedContent = cache.get('content');
 
  if (cachedContent !== null) {
    res.locals.content = cachedContent;
    next();
  } else {
    getContent().then(function(json) {
      res.locals.content = json;
      next();
    });
  }
}

router.get('/', getContentMiddleware, function(req, res, next) {
  console.log(res.locals.content)
  res.render('index', { 
    data: { 
      title: 'Express',
      message: "smonk wede",
      content: JSON.parse(res.locals.content)["posts"]
    },
    vue: {
        components: ['teaser']
    }
  });
});

module.exports = router;
