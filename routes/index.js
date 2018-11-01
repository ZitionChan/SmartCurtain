var express = require('express');
var router = express.Router();
var DBAPI=require('../dao/login');

var dbapi = new DBAPI();
/*console.log("test roomSQL:")
console.log(dbapi.roomSQL("201600000000",function(err,rows){
    console.log(err)
    console.log(rows)
}));
console.log("test loginSQL:")
console.log(dbapi.loginSQL("201600000000",function(err,rows){
    console.log(err)
    console.log(rows)
}));
console.log("test curstateSQL:")
console.log(dbapi.curstateSQL("0",function(err,rows){
    console.log(err)
    console.log(rows)
}));
console.log("test docurtainSQL:")
console.log(dbapi.docurtainSQL("4","0",1,function(err,rows){
    console.log(err)
    console.log("OK")
}));
console.log("test updatestateSQL:")
console.log(dbapi.updatestateSQL("1",1,function(err,rows){
    console.log(err)
    console.log("OK")
}));
console.log("test stopSQL1:")
console.log(dbapi.stopSQL1("2",function(err,rows){
    console.log(err)
    console.log("OK")
}));
console.log("test stopSQL2:")
console.log(dbapi.stopSQL2("2",function(err,rows){
    console.log(err)
    console.log("OK")
}));*/

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
