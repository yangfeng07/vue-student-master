// sql语句
var sqlMap = {
  // 用户
  user: {
    login: 'SELECT * FROM admin WHERE username = ?;',
    msgchange: 'UPDATE `admin` SET nickname=?,email=?,class=? WHERE username = ?;',
    pswchange: 'update `admin` set userpsw=? where id=?;'
  },

  //学生
  student: {
    scoreList: 'SELECT (SELECT COUNT(*) from `student-score` where name like ?) count ,p.* FROM `student-score` p where name like ? LIMIT ? ,?;',
    updateScore: 'UPDATE `student-score` SET name=?,chinese=?,math=?,english=?,physics=?,chemistry=?,biology=? WHERE id = ?;',
    addScore: 'INSERT INTO `student-score` (name,chinese,math,english,physics,chemistry,biology) values (?,?,?,?,?,?,?);',
    deleteScore: 'DELETE FROM `student-score` WHERE id IN (?);',
    studentList: 'SELECT (SELECT COUNT(*) from `student-list` where name like ?) count ,p.* FROM `student-list` p where name like ? LIMIT ? ,?;',
    updateStudent: 'UPDATE `student-list` SET name=?,age=?,sex=?,nation=?,address=?,contacts=?,phonenumber=? WHERE id = ?;',
    addStudent: 'INSERT INTO `student-list` (name,age,sex,nation,address,contacts,phonenumber) values (?,?,?,?,?,?,?);',
    deleteStudent: 'DELETE FROM `student-list` WHERE id IN (?);',
  }
}

module.exports = sqlMap;
