var models = require('../../db.js');//数据库链接信息
var mysql = require('mysql');
var $sql = require('../../sqlfun.js');//sql语句
var express = require('express');
var router = express.Router();
var indexRouter = {};
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 获取学生成绩
router.post('/scoreList', (req, res) => {
  var sql = $sql.student.scoreList;
  var params = req.body;
  console.log("sql",sql);
  console.log("params",params);
  conn.query(sql, [params.vname,params.vname,params.page,params.limit], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      return res.end('is over');
    }
  })
});

// 修改成绩信息
router.post('/updatescoreList', (req, res) => {
  var sql = $sql.student.updateScore;
  var params = req.body;
  console.log("sql",sql);
  console.log("params",params);
  conn.query(sql, [params.name,params.chinese,params.math,params.english,params.physics,params.chemistry,params.biology,params.id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      return res.end('is over');
    }
  })
});
// 添加信息
router.post('/addscoreList', (req, res) => {
  var sql = $sql.student.addScore;
  var params = req.body;
  console.log("sql",sql);
  console.log("params",params);
  conn.query(sql, [params.name,params.chinese,params.math,params.english,params.physics,params.chemistry,params.biology], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      return res.end('is over');
    }
  })
});
// 删除信息
router.post('/deletescoreList', (req, res) => {
  var sql = $sql.student.deleteScore;
  var params = req.body;
  conn.query(sql, [params.id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      return res.end('is over');
    }
  })
});

// 获取学生
router.post('/studentList', (req, res) => {
  var sql = $sql.student.studentList;
  var params = req.body;
  console.log("sql",sql);
  console.log("params",params);
  conn.query(sql, [params.vname,params.vname,params.page,params.limit], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      return res.end('is over');
    }
  })
});

// 修改成绩信息
router.post('/updatestudentList', (req, res) => {
  var sql = $sql.student.updateStudent;
  var params = req.body;
  console.log("sql",sql);
  console.log("params",params);
  conn.query(sql, [params.name,params.age,params.sex,params.nation,params.address,params.contacts,params.phonenumber,params.id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      return res.end('is over');
    }
  })
});
// 添加信息
router.post('/addstudentList', (req, res) => {
  var sql = $sql.student.addStudent;
  var params = req.body;
  console.log("sql",sql);
  console.log("params",params);
  conn.query(sql, [params.name,params.age,params.sex,params.nation,params.address,params.contacts,params.phonenumber], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      return res.end('is over');
    }
  })
});
// 删除信息
router.post('/deletestudentList', (req, res) => {
  var sql = $sql.student.deleteStudent;
  var params = req.body;
  conn.query(sql, [params.id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      return res.end('is over');
    }
  })
});

indexRouter.router = router;

module.exports = indexRouter;
