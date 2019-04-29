const schedule = require('node-schedule');
// let callBackIntervalList;
let rule = new schedule.RecurrenceRule();

　　rule.dayOfWeek = [0, new schedule.Range(1, 6)];

　　rule.hour = 20;

　　rule.minute = 0;
    let j = schedule.scheduleJob(rule, function(){
　　　　
　　});
// callBackIntervalList = function() {
//   console.log(2)
// } 
// var rule1     = new schedule.RecurrenceRule();  
// var times1    = [1,6,11,16,21,26,31,36,41,46,51,56];  
// rule1  = times1;  
// schedule.scheduleJob(rule1, callBackIntervalList);  
