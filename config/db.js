'use strict'

var mysql = require('mysql')
// These should have been in a model file and this an API to MODEL
var db = mysql.createConnection(process.env.JAWSDB_URL || {
  host: 'localhost',
  user: 'root',
  password: "newsqluser",
  database: "vacations"
})

db.connect(function(err) {
  // This cb called when get connected to the DB
  if (err) {
    console.log('error is:' + err);
  } else {
    console.log('Connected success');
  }
})

// Don't end here and don't make connections here
module.exports = db;
