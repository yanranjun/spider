use mafengwo;
DROP TABLE MFW_HOT_LIST; 
create table MFW_HOT_LIST (
 autoId int key auto_increment, # 自增长id
 id int unique, # id
 coverUrl varchar(800), # 封面图片
 jumpUrl varchar(100) unique, # 跳转连接
 title varchar(100), # 标题
 subtitle varchar(800), # 副标题
 position varchar(40), # 地点定位
 avatarUrl varchar(800), # 头像地址
 nickName varchar(40), # 昵称
 viewNums varchar(40) # 访问量
 );
 alter table NEW_HOT_LIST rename MFW_HOT_LIST;  # 修改表名
 select * from  MFW_HOT_LIST; # 查询整个表数据
 select count(*) from MFW_HOT_LIST; # 统计记录总数
 alter table MFW_HOT_LIST add COLUMN autoId int auto_increment;