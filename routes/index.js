var express = require('express');
var router = express.Router();
var db = require("../db");

/* GET home page. */
router.get('/', function(req, res, next) {
	db.getRules(function (rules) {
		res.render('index', { title: 'TestMach', model:{}, rules: rules });
	});
});

router.post('/', function (req, res, next) {
    if (req.body.firstName.length == 0) {
       return res.render('index', { title: 'TestMach', model:{"firstName" : "First Name missing"}, rules: [] });
    }

	db.addRule(req.body.firstName, function (rules) {
		//console.dir(rules);
		//res.render('index', { title: 'TestMach', model:{}, rules: rules });
	});	
	res.redirect('/');
});


router.post('/delete', function(req, res, next) {	
	db.deleteRule(req.body.id, function () {	
		//res.redirect('index');
	});	
	res.redirect('/');
});

module.exports = router;
