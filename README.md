# ♬ 原生小程序云开发 ---- 仿网易云音乐 + 博客 ♪

:rocket: 这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- **数据库：** 一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- **文件存储：** 在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- **云函数：** 在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

------



## 0️⃣  运行部署到自己电脑中运行

① 首先可以的话，可以Fork一下我的项目到自己的Github，项目还在更新后续可以方便查看文档，然后把我的代码下载下来解压到自己电脑

② 注册个小程序是第一步（首次注册可以看[官网文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html#申请帐号)），然后将项目在微信开发者工具打开，接下来迫在眉睫的当然就是部署服务器（也就是创建自己的云服务）

③ 【创建云环境】在微信开发者工具中，点击左上角的【云开发】进去创建云服务界面，设置好之后，返回大概等待20-30min中后重新启动微信开发工具，此时点击【编译】就可以成功对接云

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/deploy_01.png)

④ 【上传部署云函数】然后将 `cloudfuncitons` 下的几个云函数逐个右键【上传并部署：云端安装依赖】，可以通过微信开发这工具有下角的小圆圈查看上传进度，注意如果有网路问题导致上传部署失败，则对应的云函数再右键再上传一次

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/deploy_02.png)

⑤ 【创建数据库集合】项目至今用到三个云数据库表，点击【云开发】界面点击【数据库】，新建集合名称，名字不要拼错，`playlist` → 歌曲的数据集合；`blog` → 博客模块数据集合；`blog-comment` → 博客评论数据集合

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/deploy_03.png)

⑥ 【重要】确认全部云函数上传完成，进入【云开发】界面点击【云函数】，找到 `getPlaylist` 这个云函数，点击【云端测试】，左侧跳出测试面板，不用传参数，直接点【运行测试】，日志返回成功后，我们再去【数据库】中可以发现 `playlist` 集合有了音乐歌单数据，说明数据载入成功，这步骤没有成功完成将会影响小程序音乐模块的歌单展示！

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/cloud-palylist.png)

⑥ 【这一步可以不配置】项目中涉及图片或者视频资源的上传，需要在【云开发】界面点击【存储】，创建两个放资源的文件夹，一个是放图片的 `blog-image`，另一个是 `blog-video`；这步骤可以跳，不创建的话也会开发工具也会自动新建，当然对于低版本开发工具是否有这个功能就不知道了，所以最好升级最新版本的开发工具，否则就按上面操作就行

⑦ 后续随着项目功能模块增加，云服务那边的部署就会复杂一点，但我会在这里说明好的，按照上面来应该没有问题，欢迎  :sparkles::sparkles::sparkles: star​ :sparkles::sparkles::sparkles: ，有问题或者学习交流可以 加企鹅 <u>1255421861</u>，欢迎各路大神指点迷津！！

------



## 1️⃣  微信小程序开发文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 2️⃣  项目进度

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

> > 2.5 歌曲播放面板增加【喜欢功能 → 点击添加到我喜欢列表】、【分享功能 → 分享歌曲】、【评论+打赏功能（占不涉及支付，以免小程序发布不了）】（后续上新）

![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/music-player.jpg)

### 2️⃣ . 2️⃣  博客发现模块开发

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

2️⃣ . 3️⃣  个人中心模块开发

- :apple: cloudfunciton

  > 1.云调用 `cloud.openapi.wxacode.getUnlimited` 生成小程序码，配合 `cloud.uploadFile` 生成小程序码图片

- :green_apple: miniprogram



![image](https://github.com/Umbrella001/wx-yunyinyue/raw/master/DocImage/profile.png)

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