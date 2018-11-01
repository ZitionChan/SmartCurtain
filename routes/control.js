var express = require('express');
var router = express.Router();

var LOGIN=require('../dao/login');
var login = new LOGIN();

/* GET home page. */
router.get('/', function(req, res, next) {
    var user_id = req.session.user_id;

    if (user_id != undefined) {
    login.roomSQL(user_id, function (err, data) {
        res.render('control', {title: "智能窗帘", data: data, user: user_id});
    });
    } else {
        res.redirect('/');
    }
})
module.exports = router;
