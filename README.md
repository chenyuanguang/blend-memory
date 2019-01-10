<div align="center">
  <img width="300" heigth="300" src="/assets/blend-memory-logo.png" alt="blend-memory logo">
</div>


# blend-memory
[中文版](README_zh.md)

## 作者：

>陈元广

# 介绍
blend-memory 是一个轻量级的 NodeJS 进程监控工具，它提供 进程内存、V8 堆空间内存、操作系统内存 三大维度的数据可视化展示。
前端部分，借助 [Vue2](https://github.com/vuejs/vue) 和 [ChartJS](https://github.com/chartjs/Chart.js) 提供了一个不错的动态展示面板。 

> 作者基于memeye内存监控工具，重写其dashboard文件夹中的index.js和server.js,以及lib文件夹中的Collector.js，实现了将监控基于主进程，虽然会对主进程造成一定的影响，使数据具有微小的偏差，但是可以针对线上单进程环境进行性能监控，且无需进行服务器多个安全组端口的开发

<!-- > blend-memory 可以支持在宿主进程中使用，只植入一个简单的数据收集器，其他工作则启动一个子进程，交由子进程来进行。    
这样做能把 blend-memory 的代码对宿主进程的影响降到最低，以确保数据的真实性。  -->

> blend-memory 可以主进程中使用，进行数据收集器，可以在主进程的端口下进行数据展示页面的访问；方便在生产环境中的使用;

## 注意

> 收集数据为单进程；无发收集分布式架构的数据
> 当前监控代码寄托在主进程中，对主进程具备一定的影响，数据相对真实；

### 特点
- 轻量级
- 简单
- 面向开发环境
- 可视化

*Note: Memeye 暂时只支持单进程，NodeJS 分布式进程还不适用，所以不建议在产品环境使用。*

   

# 兼容性
- Node v7.x

# 安装 & 使用

运行下面命令安装 : 

``` bash

npm install blend-memory --save-dev

```


以express-generator生成的项目为例


. app.js文件
``` js
const {BMConfig} = require('blend-memory');

var app = express();

BMConfig(app);

```
. bin/www 文件
``` js
const {BMServer} = require('blend-memory');

app.set('port', port);
var server = https.createServer(app);
var io=BMServer(server) //返回一个io对象，项目中如果使用io对象，可以将此添加为全局，方便在其他模块应用

```


最后打开你的浏览器，输入下面地址：(blendMemory路径为界面路径)

```
http://localhost:3000/blendMemory

```

就这么简单！

# 许可

[MIT License](LICENSE)

Copyright (c) 2016-2020 chenyuanguang
