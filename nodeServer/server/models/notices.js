let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let noticeSchema = new Schema({
  "noticeId": String,
  "noticeTitle": String,
  "noticeContent": String,
  "adminId": Number,
  "adminName": String
});

module.exports = mongoose.model('Notice',noticeSchema);