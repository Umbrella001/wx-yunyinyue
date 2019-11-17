# 原生小程序云开发 ---- 仿网易云音乐

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 0️⃣  运行部署到自己电脑中运行

① 首先可以的话，可以Fork一下我的项目到自己的Github，项目还在更新后续可以方便查看文档，然后把我的代码下载下来解压到自己电脑

② 注册个小程序是第一步（首次注册可以看[官网文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html#申请帐号)），然后将项目在微信开发者工具打开，接下来迫在眉睫的当然就是部署服务器（也就是创建自己的云服务）

③ 在微信开发者工具中，点击左上角的【云开发】进去创建云服务界面，设置好之后，返回大概等待20-30min中后重新启动微信开发工具，此时点击【编译】就可以成功对接云



![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/deploy_01.png)

④ 然后你将 ==cloudfuncitons== 下的几个云函数，右键上传并部署到你的云服务中，成功后就是差最后一步了

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/deploy_02.png)

⑤ 项目刚起步，用到了一个云数据库表，所以你进去你【云开发】界面点击【数据库】，下面新建一个集合名称，名字要起对，叫 ==playlist== → 这是歌曲的数据存放地；现在项目已经完成了音乐模块，后续还有一些优化，后面会更新，具体可看文档

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/deploy_03.png)

⑥ 后续随着项目功能模块增加，云服务那边的部署就会复杂一点，但我会在这里说明好的，按照上面来应该没有问题，欢迎star

## 1️⃣  参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 2️⃣  项目进度

### 2️⃣ . 1️⃣  音乐模块开发

- cloudfunciton

1. 实现定时触发器云函数的定时周期爬数据（网易云音乐）歌单及其歌曲数据
2. 使用tcb-router管理项目路由跳转部分
3. 突破小程序读取条数限制 + 配合云数据库完成数据的增删改查

- miniprogram

1. 完成小程序音乐模块中的轮播图，歌单的获取及展示，歌单内部歌曲的获取及展示

   1.1 swiper轮播图原生组件

   1.2 组件定义开发playlist （歌单列表）、musiclist（音乐列表）


![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/music-panel.png)

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/music-list.png)

2. 完成小程序音乐面板布局

   2.1 配合H5动画还原网易云音乐播放动画

   2.2 借用IconFont

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/music-lyric.png)

2. 歌曲播放以及歌词联动等细节（音乐模块完成）

   3.1 组件化开发 progress-bar（播放进度条） 、lyric（歌词界面）

   3.2 使用getBackgroundAudioManager完成播放音乐功能

   3.3 配合movable-area、movable-view、progress完成歌词播放进度条联动

   3.4 组件间通信+组件生命周期 、组件和页面通信+页面生命周期

   3.5 高度还原网易云音乐的播放界面细节点

   ![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/lyric-panel.png)

### 2️⃣ . 2️⃣  博客发现模块开发

- cloudfunciton

  （撰写中...）

- miniprogram



1. 完成小程序博客模块发布界面的授权登录

   1.1 组件化两个 author-popup（授权登录弹窗），author（授权登录）

   1.2 完成组件突破组件隔离使用全局样式

   1.3 使用button中open-type为getUserInfo进行用户信息获取，通过wx.getSetting拿到对应授权信息

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/blog-author.png)