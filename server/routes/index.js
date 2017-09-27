var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'XiaoBai'});
});

router.get('/xiaobai', function (req, res, next) {
    res.json({'name': 'XiaoBai'});
});

module.exports = router;
