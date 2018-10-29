var express = require('express');
var router = express.Router();

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
