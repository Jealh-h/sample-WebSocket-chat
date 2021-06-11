# sample-WebSocket-chat

一个用 nodejs + WebSocket + js 创建的简易群聊室

### ## 运行

可以下载直接用，server文件夹里面包含有node_modules.

后端：node server.js

前端：浏览器打开index.html

## 效果

### 登录页

![img](https://img-blog.csdnimg.cn/20210610214934580.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NzUzMzU4,size_16,color_FFFFFF,t_70)

### 聊天首页

![img](https://img-blog.csdnimg.cn/20210610215156865.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NzUzMzU4,size_16,color_FFFFFF,t_70)

## 改进地方

1.不能加载聊条记录。

2.目前只支持文本输出。

3.用户名存在局限，登录时使用的get提交表单，获取时会被url编码，具体编码由charset决定，不如‘空格’会编译成‘+‘。

