var express = require('express');
var router = express.Router();
var path = require('path');
const HTML_FILE = path.join(__dirname, 'index.html');

var db = require('../config/db');


router.get('/', function(req, res, next) {
	db.query('SELECT * FROM vacations', function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});


router.post('/', function(req, res, next) {
	var q = 'INSERT INTO vacations (destination, city, state, zip, country) VALUES ('
	q +=  '"' + req.body.destination + '","' +
	req.body.city + '","' + req.body.state + '","' +
  req.body.zip + '","' + req.body.country + '")'
  db.query(q, function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});

router.put('/:id', function(req, res, next) {
	var columnName = ''
	if (req.body.destination) {
		columnName += " destination='" + req.body.destination + "' "
	}

	if (req.body.city) {
		  if (columnName !== '') {
		  	columnName += ','
		  }
			columnName += " city='" + req.body.city + "' "
	}

	if (req.body.state) {
			if (columnName !== '') {
		  	columnName += ','
		  }
			columnName += " state='" + req.body.state + "' "
	}

	if (req.body.zip) {
			if (columnName !== '') {
				columnName += ','
			}
			columnName += " zip='" + req.body.zip + "' "
	}

	if (req.body.country) {
			if (columnName !== '') {
		  	columnName += ','
		  }
			columnName += " country='" + req.body.country + "' "
	}
	var q = "UPDATE vacations SET " + columnName + " where id=" + req.params.id
  console.log('insert is:', q)

  db.query(q, function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});

router.delete('/:id', function(req, res, next) {

	var q = "DELETE FROM notes WHERE Vacations_id=" + req.params.id
  q = "select * from notes"
	// Delete from detail table
  db.query(q, function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {

			// Delete from master table
			var q = "DELETE FROM vacations WHERE id=" + req.params.id
		  db.query(q, function(err, rows, fields) {
				if (err) {
					res.status(400);
					res.send(err);
				} else {
					res.send(rows);
				}
			});
		}
	})


});

module.exports = router;
