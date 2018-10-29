var express = require('express');
var router = express.Router();


var user={
    userid:"123456",
    password:"123456"
}

router.post('/',function(req,res,callback){

  var user_id = req.body.user_id;
  var password = req.body.user_password;
  if(user_id==user.userid){
    if(password == user.password){
      req.session.user_id = user_id;
    }
  }

    res.redirect('/');
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.query.logout=='true'){
    req.session.destroy();
  }
  res.redirect('/');
});

module.exports = router;
