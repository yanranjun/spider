
const express = require('express')
const getHotListController = require('./controllers/hotList/getListController')
const app = express()
app.listen(5210, ()=>{
    // 打印一下
    console.log('http://127.0.0.1:5210')
}) 
