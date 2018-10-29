var express = require('express');
var router = express.Router();


var data=[
    {
        room:"我的房间",
        state:true,
        curtain:
            [
                {name:"左窗帘",state:true},
                {name:"右窗帘",state:false}
                ]
    },
    {
        room:"客厅",
        state:false,
        curtain:
            [
                {name:"窗帘1",state:false},
                {name:"窗帘2",state:false},
                {name:"窗帘3",state:false}
                ]
    },
    {
        room:"书房",
        state:true,
        curtain:
            [
                {name:"窗帘3",state:true},
                {name:"窗帘4",state:false},

            ]
    }

];

/* GET home page. */
router.get('/', function(req, res, next) {

    var user_id = req.session.user_id;

    if(user_id!=undefined) {
        res.render('control', {title: "智能窗帘", data: data, user: user_id});
    }else{
        res.redirect('/');
    }
});

module.exports = router;
