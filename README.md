# ♬ 原生小程序云开发 ---- 仿网易云音乐 + 博客 ♪

:rocket: 这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- **数据库：** 一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- **文件存储：** 在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- **云函数：** 在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

------



## 0️⃣  运行部署到自己电脑中运行体验

部署的看这里 → [猛戳猛戳猛戳](https://blog.csdn.net/Umbrella_Um/article/details/103303549)

部署的看这里 → [猛戳猛戳猛戳](https://blog.csdn.net/Umbrella_Um/article/details/103303549)

部署的看这里 → [猛戳猛戳猛戳](https://blog.csdn.net/Umbrella_Um/article/details/103303549)

------



## 1️⃣  微信小程序开发文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 2️⃣  设计思路与项目进度

### 2️⃣ . 1️⃣  音乐模块开发

- :apple: cloudfunciton

> 1.实现定时触发器云函数的定时周期爬数据（网易云音乐）歌单及其歌曲数据

> 2.使用tcb-router管理项目路由跳转部分

> 3.突破小程序读取条数限制 + 配合云数据库完成数据的增删改查

- :green_apple: miniprogram

> 1.【完成小程序音乐模块中的轮播图，歌单的获取及展示，歌单内部歌曲的获取及展示】

> > 1.1 swiper轮播图原生组件

> > 1.2 组件定义开发playlist （歌单列表）、musiclist（音乐列表） 

> > 1.3 对接网易云歌单接口进行请求展示，格式化播放量

> > 1.4 增加歌单首页【全局搜索歌曲 → 直接搜索自己喜欢的歌曲】（后续上新）

> > 1.5 增加歌单列表【歌曲排名、音质标识、VIP标识】（后续上新）


![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/music-list.jpg)

> 2.【完成音乐面板布局 + 歌曲播放以及歌词联动等细节（音乐模块完成）】

> > 2.1 配合H5动画还原网易云音乐播放动画

> > 2.2 组件化开发 progress-bar（播放进度条） 、lyric（歌词界面）

> > 2.3 用getBackgroundAudioManager完成播放音乐功能

> > 2.4 配合movable-area、movable-view、progress完成歌词播放进度条联动

> > 2.5 歌曲播放面板增加【评论+打赏功能（占不涉及支付，以免小程序发布不了）】（后续上新）

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/music-player.jpg)

2️⃣ . 2️⃣  博客发现模块开发

- :apple: cloudfunciton

  > 1.创建博客blog集合数据库，数据由miniprogram前端部分向数据库增加字段（用户微信名称，用户微信头像，发布的图片或者视频的FileID，发布的内容，发布的服务端时间）

  > 2.发布的图片和视频将存储在云存储中（图片blog-image，视频blog-video），前端页面通过fileID进行获取

  > 3.使用微信小程序创建索引管理，对涉及搜索的字段进行优化慢查询操作（针对content发布内容，根据服务器时间publishTime排序）

  ![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/blog-search.png)

- :green_apple: miniprogram

> 1.【完成小程序博客模块发布界面的授权登录】

> > 1.1 组件化两个 author-popup（授权登录弹窗），author（授权登录）

> > 1.2 完成组件突破组件隔离使用全局样式

> > 1.3 使用button中open-type为getUserInfo进行用户信息获取，通过wx.getSetting拿到对应授权信息

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/blog-author.png)



> 2.【博客模块发布编辑页制作（测试：【真机调试】，开发工具部分功能测不了，本人使用IOS测，Android没测多少有BUG可以私我）】

> > 2.1 编辑字数检测，监测不同机型拉起键盘高度改变发布底部发布布局样式

> > 2.2 可以根据用户需求上传图片或者视频，默认最多9，视频1

> > 2.3 点击图片或者视频都可以进入预览图片或者播放视频，点击右上角的叉叉可进行删除

> > 2.4 解决BUG：修复播放视频时，textarea输入框（原生组件）遮住播放视频的返回编辑页的按钮；增加切换发布类型（图片 / 视频）仍可以记录上一个编辑的最后格式

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/publish-type.jpg)

> 3.【将用户图片或者视频上传云存储，将博客展示卡片需要的内容信息添加到云数据库中】

> > 3.1 检查用户发布的内容是否符合发布规则（发布文字和图片 / 视频 两者必有其一方可进行发布操作）

> > 3.2 使用 `wx.cloud.uploadFile` 将图片或者视频资源上传到云存储

> > 3.3 链接数据库集合 【blog】 ，添加博客卡片需要的数据（用户名，头像，发布的 图片/视频 地址链接，发布文案，及其发布时间）



> 4.【完成博客卡片列表 + 模糊搜索功能】

> > 4.1 从发布成功到展示博客列表，完成自动查询数据库并展示发布内容

> > 4.2 增加一个 `PublishType` 字段用于区分发布的是图片还是视频，方便做展示处理

> > 4.3 继承了发布编辑页的功能，在博客列表点击图片或者视频都可以预览或者播放

> > 4.4 点击博客卡片可以进入博客评论页，展示对应博客信息以及对应评论列表

> > 4.5 配合云数据库进行模糊搜索并展示对应搜索结果的博客列表

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/blog-card.jpg)

> 5.【完成博客评论推送 + 博客分享推送】（博客模块完成）

> > 5.1 结合云调用 `templateMessage.send` 实现评论的模版推送功能

> > 5.2 完成博客模块的分享功能，微信好友点击可以到达博客评论页

> > 5.3 后续配合数据库一对多，多对多设计完成【博客喜欢列表】及其【博客点赞、踩功能】（后续上线）

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/comment-share.jpg)

### 2️⃣ . 3️⃣  个人中心模块开发

- :apple: cloudfunciton

  > 1.云调用 `cloud.openapi.wxacode.getUnlimited` 生成小程序码，配合 `cloud.uploadFile` 生成小程序码图片

- :green_apple: miniprogram



![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/profile.jpg)

> 1. 【最近播放】可查看播放歌曲的历史

> > 1.1 使用微信小程序的storage进行储存，播放历史的歌曲列表，使用用户openid作为key，实现不同用户只能读取自己的播放历史

> > 1.2 除非用户清楚小程序数据，否则播放历史将存在小程序的storage中

> > 1.3 修复播放历史中循环的不是历史歌曲BUG

> 2. 【我的博客】用户可以查看自己发布的博客

> > 2.1 使用组件复用即可完成这个版块的布局样式，用过用户openid去查询数据库，拿到自己的博客列表

> > 2.2 部分同学反馈，怎么让看到朋友写的博客，两个步骤；
> >
> > ① 首先去 [微信开发者平台](https://mp.weixin.qq.com) 中的【成员管理】将你朋友的微信号加入访问读写权限
> >
> > ② 最后在【云开发】界面中的【数据库】中找到 `blog` 集合，然后选择【权限设置】将 "仅创建者可读写" → "所有用户可读"

> 3. 【我的喜爱】用户可以将喜欢的歌曲添加进我的喜爱

> > 3.1 跟【最近播放】的思路一样，使用storage将用户点击的喜欢歌曲加入即可

> > 3.2 后续将用户点赞的博客也放入【我的喜爱】页面中，方便用户查看（后续迭代）

> 4. 【福利中心】暂时开发九宫格抽奖（随机非固定）

> > 4.1 完成九宫格抽奖功能，抽到的奖品完全随机，并不是网上的固定版，抽奖结束自动弹窗

> > 4.2 目前【福利中心】开放九宫格抽奖，后续新增功能，全部组件化设计 → 后续新增【翻牌子】，【摇骰子】都不涉及金钱（只供娱乐）

> > 4.3 【福利中心】对接 后续功能【我的金币（商城系统敬请期待）】

> > 4.4 【不足】目前抽奖的商品并没有放到自己的小程序后台，因此存在局限性，后续小程序发布后将奖品信息，存入数据库方便后台调试

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/profile-tabbar.jpg)

## 3️⃣  更新及其BUG列表（上线版本）

假设已经上线了(┬＿┬)，审核过不了呀惨！；小程序的审核流程有兴趣的可以去官网看看，对于这款小程序存在音乐又含有开放性的博客广场很难过审核，所以只能拿来练练手，部署体验了；很难受...，但是我会一直维护，开发到一个满意的小程序为止，无私贡献我的小源码，如果有什么不足的代码或者更好的想法，都可以联系我，我们一起讨论，一起进步【企鹅：1255421861 】

> v1.0.0

> > ✪ :tada: :tada:【伞音世界】假设上线，体（部）验（署）一下吧 :tada: :tada:



> v1.0.1

> > ✪ 修复【博客广场】发布后图片顺序不能按照编辑的图片顺序排序问题

> > ✪ 修复【伞云音乐】获取歌单列表超时和歌单展示最新错误的问题



> v1.1.1

> > ✪ 优化【博客广场】【我的喜爱】新UI视图体验，更简洁圆滑

> > ✪ 增加【我的喜爱】可以切换展示我喜爱的歌曲和我喜爱的博客列表

> > ✪ 修复【博客广场】下拉刷新，没有同步博客爱心的问题



> v1.1.2

> > ✪ 增加播放音乐时，在tabBar页显示音乐导航图标，点击可跳转到当前播放歌曲界面