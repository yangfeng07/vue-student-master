/**
 * Created by jerry on 2017/11/13.
 * users相关路由
 * 采用 restful api 风格
 */
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
//用户登录
router.post('/login', (req, res) => {
  var sql = $sql.user.login;
  var params = req.body;
  console.log("sql",sql);
  console.log("params",params);
  conn.query(sql, [params.username], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      for(var i = 0; i < result.length; i++){
        console.log("请求回来！",result[i])
        console.log("请求结果！",typeof result[i],result[i].userpsw);
        if (result[i].userpsw == params.userpsw) {
          console.log("返回回来了！");
        }
      }
      return res.end('is over');
    }
  })
});

//信息修改
router.post('/msgchange', (req, res) => {
  var sql = $sql.user.msgchange;
  var params = req.body;
  conn.query(sql, [params.nickname,params.email,params.class,params.username], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      for(var i = 0; i < result.length; i++){
        console.log("请求回来！",result[i])
        console.log("请求结果！",typeof result[i],result[i].userpsw);
        if (result[i].userpsw == params.userpsw) {
          console.log("返回回来了！");
        }
      }
      return res.end('is over');
    }
  })
});

//密码修改
router.post('/pswchange', (req, res) => {
  var sql = $sql.user.pswchange;
  var params = req.body;
  conn.query(sql, [params.userpsw,params.id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      for(var i = 0; i < result.length; i++){
        console.log("请求回来！",result[i])
        console.log("请求结果！",typeof result[i],result[i].userpsw);
        if (result[i].userpsw == params.userpsw) {
          console.log("返回回来了！");
        }
      }
      return res.end('is over');
    }
  })
});
//用户登录
/*//用户退出
router.get('/logout', userController.logout);

//先检查登录
router.use(userController.checkLogin);

//更新个人部分信息
router.patch('/profile', userController.profile);
//用户修改个人密码
router.patch('/changepwd', userController.changepwd);

//返回user的集合
router.get('/', userController.find);*/
//
// //返回指定的user
// router.get('/:id', userController.findById);
//
// //创建user
// router.post('/', userController.create);
//
// //更新user全部信息
// router.put('/:id', userController.update);
//
// //更新user部分信息
// router.patch('/:id', userController.patch);
//
// //删除指定的user
// router.delete('/:id', userController.delete);

indexRouter.router = router;

module.exports = indexRouter;

