var express = require('express');
var router = express.Router();

var LOGIN=require('../dao/login');
var login = new LOGIN();

router.post('/',function(req,res,callback){
  var user_id = req.body.user_id;
  var password = req.body.user_password;

  if(user_id !=undefined && password !=undefined) {
      login.loginSQL(user_id, function (err, rows) {

          if (rows[0].password === password) {
              req.session.user_id = user_id;
              res.redirect('/control');
          } else {
              res.redirect('/');
          }
      })
  }else{
      res.redirect('/');
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.query.logout=='true'){
    req.session.destroy();
  }
  res.redirect('/');
});

module.exports = router;
