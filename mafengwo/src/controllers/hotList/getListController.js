const express = require('express')
const conn = require('../../hot/getListSql')
const app = express()
// 获取所有的数据
app.get('/api/getHotList',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from MFW_HOT_LIST '
    conn.query(sqlStr,(err,results) => {
        console.log(results)
        if(err) return res.json({err_code:666,message:'获取失败',affectedRows:0})
        res.json({
            err_code:200,message:results,affectedRows:0
        })
    })
})
//处理跨域请求
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
 
app.get('/',function(req,res){
    res.send('请求home成功');
})
const port =  3001;
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
