// 创建数据库连接
const express = require('express')
const mysql = require('mysql')
const app = express()
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'qq741789753',
    database:'mafengwo'
})
conn.connect()
console.log('数据库已经连接')
// 祖册 解析表单的body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

module.exports = conn
