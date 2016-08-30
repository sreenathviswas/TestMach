var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/testmach';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TestMach', model:req.body||{}, ruleName:[] });
});

router.post('/', function(req, res, next) {	
	var cursor = [];
	MongoClient.connect(url, function(err, db) {
	  console.log("Connected correctly to server..........");
	   cursor = db.collection('rule').find();
		cursor.each(function(err, doc) {
		  if (doc != null) {
			 console.dir(doc.ruleName);
		  } 
		});
	  db.close();
	  res.render('index', { title: 'TestMach', model:req.body, ruleName:cursor });
	  console.dir(cursor[0]);
	});	
});

module.exports = router;
