let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Notices = require('../models/notices');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/park',{ useNewUrlParser: true });
// mongoose.connect('mongodb://root:123456@127.0.0.1:27017/park');

mongoose.connection.on('connected', function() {
  console.log('MongoDB connected success.');
});

mongoose.connection.on('error', function() {
  console.log('MongoDB connected fail.');
});

mongoose.connection.on('disconnected', function() {
  console.log('MongoDB connected disconnected.');
});

router.get("/", function(req, res, next) {
  // res.send('Hello, notices list.');
  Notices.find({}, function (err, doc) {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status:'0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  });
});

module.exports = router;