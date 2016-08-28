var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TestMach', message:'Welcome to TestMach' });
});

router.post('/save', function(req, res, next) {
  res.render('rule', { title: 'TestMach', message:'Welcome to TestMach' });
});

module.exports = router;
