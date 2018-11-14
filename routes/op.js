var express = require('express');
var router = express.Router();

var DBAPI=require('../dao/login');

var dbapi = new DBAPI();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    if(req.session.user_id!=undefined){




        res.redirect('/control');
    }else {
        res.render('index', {title: '智能窗帘'});
    }
});

module.exports = router;