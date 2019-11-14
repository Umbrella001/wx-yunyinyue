# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

### 项目进度

- cloudfunciton

1. 实现定时触发器云函数的定时周期爬数据（网易云音乐）歌单及其歌曲数据
2. 使用tcb-router管理项目路由跳转部分
3. 突破小程序读取条数限制 + 配合云数据库完成数据的增删改查

- miniprogram

1. 完成小程序音乐模块中的轮播图，歌单的获取及展示，歌单内部歌曲的获取及展示

   1.1 swiper轮播图原生组件

   1.2 组件定义开发playlist 、musiclist

   1.3 


![1571901894657](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1571901894657.png)

![1571901972076](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1571901972076.png)

2. 完成小程序音乐面板布局

3. 歌曲播放以及歌词联动等细节（音乐模块完成）

   3.1 组件化开发 progress-bar 、lyric

   3.2 使用getBackgroundAudioManager完成播放音乐功能

   3.3 配合movable-area、movable-view、progress完成歌词播放进度条联动

   3.4 组件间通信+组件生命周期 、组件和页面通信+页面生命周期

   3.5 高度还原网易云音乐的播放界面细节点

![1573754863719](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1573754863719.png)