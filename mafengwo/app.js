// 'use strict';
const puppeteer = require('puppeteer');
const cheerio =  require('cheerio');
const {addHotListSql} = require('./src/hot/connectSql.js');
const fs = require('fs');
const schedule = require('node-schedule');
// 定时任务
let rule = new schedule.RecurrenceRule();
　　rule.dayOfWeek = [0, new schedule.Range(1, 6)];
　　rule.hour = 11;
　　rule.minute = 0;
   let j = schedule.scheduleJob(rule, function(){
     getList()
　　});

 // 等待3000毫秒
const sleep = time => new Promise(resolve => {
     setTimeout(resolve, time);
 })

// 获取列表信息
getList()

 // 目标页面
const pageUrl = 'http://www.mafengwo.cn/';
function getList(){
  (async () => {
    try {
        const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }).catch(() => browser.close);
        const page = await browser.newPage();
        await page.goto(pageUrl);
          try {
            let pageNums = await page.$eval('.count', el => {
              let str = el.innerHTML
              return str;
            });
            pageNums = parseInt(pageNums.substring(1))
           for(let count = 0 ; count < pageNums; count++){
            await sleep(3000)
            let thList = await page.$eval('.tn-list', el => {
              let str = el.innerHTML
              return str;
            });
          // count ++
          console.log('-------------------------------------------- start')
          console.log('页面页码：', count);
          console.log('采集状态：', '成功');
          await getListData(thList) 
          if (count < pageNums) {
            await page.click('.pg-next._j_pageitem')
          } else {
            console.log(' the last one')
            await page.click('.pi:nth-child(8)')
          }
          console.log('-------------------------------------------- end')
           }
        } catch (error) {
          console.log('-------------------------------------------- start')
          console.log('采集状态：', '失败');
          console.log('错误信息：', error)
          console.log('-------------------------------------------- end')
        }
        await sleep(3000)
        await browser.close();
    } catch (e) {
        console.log(e);
    }
  })()
}
// 获取列表信息
function getListData(html) {
  let $=cheerio.load(html);
  let itemList = $('.tn-item')
  let hotList = []
  for (let i = 0; i < itemList.length; i++) {
     let item = {};
      item.coverUrl = $(itemList[i]).find('.tn-image img').attr('src')
      item.jumpUrl = $(itemList[i]).find('.tn-image a').attr('href') // itemList[i].children[0].children[0].href
      item.id = parseInt(item.jumpUrl.substring(3)) // 列表ID 作为唯一标识
      item.title = $(itemList[i]).find('.tn-wrapper dl dt a').text() // itemList[i].children[1].children[0].children[0].children[1].innerText 
      item.subtitle = $(itemList[i]).find('.tn-wrapper dl dd a').text()  // itemList[i].children[1].children[0].children[1].children[0].innerText
      item.position = $(itemList[i]).find('.tn-extra .tn-place a').text() // itemList[i].children[1].children[1].children[1].children[1].innerText
      item.avatarUrl = $(itemList[i]).find('.tn-extra .tn-user a img').attr('src')  // itemList[i].children[1].children[1].children[2].children[0].children[0].src
      item.nickName = $(itemList[i]).find('.tn-extra .tn-user a').text().trim() // itemList[i].children[1].children[1].children[2].children[0].innerText.trim()
      item.viewNums = $(itemList[i]).find('.tn-extra .tn-nums').text()  // itemList[i].children[1].children[1].children[3].innerText
      addHotListSql(item)
      // hotList.push(item)
  }
}
