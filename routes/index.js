var express = require('express');
var router = express.Router();
var path = require('path');
const HTML_FILE = path.join(__dirname, 'index.html');


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  	res.sendFile(HTML_FILE);
});

module.exports = router;
