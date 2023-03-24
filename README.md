# 肤质测评&个性化化妆品推荐系统

项目为web系统，用户注册后填写关于自己肤质 消费能力 年龄 购买偏好的调查问卷，系统接收到用户的调查问卷后对用户的肤质进行综合评估，根据评估结果使用推荐算法智能推荐护肤产品和化妆品 推荐的护肤品和化妆品来源为各大购物网站购买链接.

## 环境及版本说明

- vue版本3.2.45
- element-plus版本2.2.36
- node版本12.14.1

## 开发相关环境及配置

### 接口地址

正式接口地址：localhost:8978

测试接口地址：http://www.pymjl.com:8978   

## 项目配置
### 安装node环境
### 安装依赖
`npm install` 
### 项目编译&热加载【开发模式】
`npm run dev` 
### 项目打包 for production
`npm run build` 

## 项目结构

```
skin-type-recommendation
├─ .env.development  开发环境
├─ .env.production   生产环境
├─ index.html        打包页面模板
├─ package.json      项目描述文件
├─ public            公共目录
│  └─ vite.svg       
├─ README.md         目说明文档
├─ src               开发根目录
│  ├─ apis           接口调用目录
│  │  ├─ config.ts
│  │  ├─ cosmetic.ts
│  │  ├─ login.ts
│  │  ├─ tag.ts
│  │  └─ user.ts
│  ├─ App.vue        项目入口文件
│  ├─ assets         项目静态文件目录
│  │  ├─ img
│  │  │  ├─ bg1.jpg
│  │  │  ├─ checked.png
│  │  │  ├─ title.jpg
│  │  │  ├─ unchecked.png
│  │  │  └─ waoku.jpg
│  │  └─ vue.svg
│  ├─ components     组件文件
│  │  ├─ admin       管理端组件文件
│  │  │  ├─ cosemtic
│  │  │  │  └─ Cosmetic.vue
│  │  │  ├─ layout
│  │  │  │  ├─ Header.vue
│  │  │  │  ├─ Main.vue
│  │  │  │  └─ Menu.vue
│  │  │  ├─ tag
│  │  │  │  └─ Tag.vue
│  │  │  └─ user
│  │  │     └─ User.vue
│  │  ├─ common     公共组件
│  │  │  ├─ Add.vue
│  │  │  └─ Delete.vue
│  │  ├─ home       用户端组件
│  │  │  ├─ layout
│  │  │  │  ├─ Detail.vue
│  │  │  │  ├─ Header.vue
│  │  │  │  ├─ Main.vue
│  │  │  │  └─ Radio.vue
│  │  │  └─ mine
│  │  │     └─ UserInfo.vue
│  │  ├─ Login     登录组成组件
│  │  │  ├─ Login.vue
│  │  │  └─ Rigster.vue
│  │  └─ navigation 问卷组件
│  │     ├─ Btn.vue
│  │     ├─ Content.vue
│  │     └─ Title.vue
│  ├─ main.ts             项目核心文件
│  ├─ router              路由文件目录
│  │  └─ index.ts         路由配置
│  ├─ stores              共享数据文件
│  │  ├─ index.ts         
│  │  └─ user.ts
│  ├─ utils
│  │  └─ mySwitch.ts
│  ├─ views              页面目录
│  │  ├─ admin.vue       管理员页面
│  │  ├─ chooseTags.vue  标签选择页面
│  │  ├─ detail.vue      化妆品详情页
│  │  ├─ home.vue        用户主页
│  │  ├─ login.vue       登录注册页面
│  │  ├─ mine.vue        我的页面
│  │  └─ navigation.vue  问卷页面
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```