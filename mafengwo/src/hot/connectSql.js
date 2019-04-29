let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : '101.132.190.241',//'127.0.0.1',
  user     : 'root',
  password : '666666',// 'qq741789753',
  database : 'mafengwo'
});
connection.connect();
console.log('链接成功')
const addHotListSql = (val) => {
 const _sql = 'insert into MFW_HOT_LIST set ? ';
 return connection.query( _sql, val, function (error, results, fields) {
   try {
    if (error) throw error;
   } catch (error) {
     console.log(error)
   }
  
   console.log('The solution is: ');
  })
} 
module.exports = {
  addHotListSql
}
