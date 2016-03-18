var express = require('express');
var router = express.Router();

var db = require('../config/db');

router.get('/', function(req, res, next) {
	db.query('SELECT * FROM notes where Vacation_id=' + req.params.id, function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});

router.post('/', function(req, res, next) {
	var q = 'INSERT INTO notes (note, Vacation_id) VALUES ('
	q +=  '"' + req.body.note + '","' + req.body.id + '")'
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
	var	columnName = " note='" + req.body.note + "' "

	var q = "UPDATE notes SET " + columnName + " where id=" + req.params.id
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
	var q = "DELETE FROM notes WHERE id=" + req.params.id
  db.query(q, function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});

module.exports = router;
