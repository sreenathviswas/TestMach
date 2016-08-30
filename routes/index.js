var express = require('express');
var router = express.Router();
var db = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {
	db.getRules(function (rules) {
		res.render('index', { title: 'TestMach', model:{}, rules: rules });
	});
});

router.post('/', function(req, res, next) {	
	db.addRule(req.body.firstName, function (rules) {
		console.dir(rules);
		res.render('index', { title: 'TestMach', model:req.body, rules: rules });
	});	
	db.getRules(function (rules) {
		console.dir(rules);
		res.render('index', { title: 'TestMach', model:req.body, rules: rules });
	});
});


router.post('/delete', function(req, res, next) {
	db.deleteRule(req.body.id, function () {
		db.getRules(function (rules) {
			console.dir(rules);
			res.render('index', { title: 'TestMach', model:req.body, rules: rules });
		});	
		//res.render('index', { title: 'TestMach', model:{}, rules: rules });
	});
})

module.exports = router;
