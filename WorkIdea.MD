# 思路

1. 得有一个总的 websocket Connect 用来通信 所以得放在 app 中
   但是组件中怎么使用 呢 直接 this.props.Connect 用来通信
2. 我的设想是半个屏幕都是 按钮 半个屏幕都是 场景 但是有个问题 场景显示什么
   要是按照 raydata 的来 自己拖动 按钮啥的 那这个 就又是一个 空军项目了 。。。。 大的系统 这个短时间 哼哼。。。。
   osc-js OSC 协议 udp WebSocket

osc-js is an Open Sound Control library for JavaScript applications (UMD module for Node, Browser etc.) with address pattern matching and timetag handling. Sends messages via UDP, WebSocket or both (bridge mode) and offers a customizable Plugin API for network protocols.
osc-js 是一个开放的声音控制库，用于 JavaScript 应用程序（用于 Node，Browser 等的 UMD 模块），具有地址模式匹配和时间戳处理。通过 UDP，WebSocket 或两者（桥接模式）发送消息，并为网络协议提供可自定义的插件 API

jsonOpen 读取键值对
jsonvalue 读取 数组 并可以操作数组 过滤数组

using Ventuz.Kernel.Remoting.dll;

先用 websocket 吧 没办法 osc 有学习成本

先用 总脚本这个可以 控制 端口 和口令
总脚本 开放 string 用来 实现传递消息
有一个 多个 处理脚本 这些处理脚本就是 通过这一脚本合并为一个 输出

这个多合一的脚本如何做呢 有 50 个输入口  
输入口经过

```cs
		if ((string.IsNullOrEmpty(this.MyName) == false && latestMyName.Equals(this.MyName) == false))
		{
			latestMyName = this.MyName;
			//OnReGetData(-1);
		}
```

转换成 output 但是怎样控制 这 50 个有序 转成 output 呢 顺序判断吗 顺序判断着应该不会出现 问题

然后有很多个 功能脚本 比如 bool 或者 手势控制

ventuz 如何传达 发来的信息 总线口 有一个 output 然后传给 中间脚本 中间脚本传给 所有节点 所有节点判断是否是 给自己的指令 不是就不做操作

重点脚本中 有一个名称 用来区分 有 总线 的输入和输出 有 操作脚本的输入和输出 只在操作脚本中加事件

```cs
https://weblog.west-wind.com/posts/2007/jun/29/httpwebrequest-and-gzip-http-responses
		VLog.Info(Url+Prams);
		HttpWebRequest req = (HttpWebRequest) WebRequest.Create(Url+Prams);
		req.Method = "GET";
		req.Headers.Add("Authorization", AuthStr);
		//req.Headers["Authorization"] = AuthStr;
	//	req.Referer = "https://www.baidu.com/";
		HttpWebResponse resp = (HttpWebResponse) req.GetResponse();
		Stream stream = resp.GetResponseStream();
		string result = "";
		//注意，此处使用的编码是：gb2312  //using (StreamReader reader = new StreamReader(stream, Encoding.Default))  using (StreamReader reader = new StreamReader(stream, Encoding.GetEncoding("gb2312")))
		try
		{
			//获取内容
			using (StreamReader reader = new StreamReader(stream))
			{
				result = reader.ReadToEnd();
			}
		}
		finally
		{
			stream.Close();
		}

		ResponseStr = result;
		return result;

```

45.82.255.254
45.83.151.42
154.81.2.60

https://llaah.xyz
https://mvll3.xyz

```js
json 字符串构造


公共 字符串
ButtonName : 按钮名称
TransData : 传递的数据
const TransData  = {
	ButtonName: 'ButtonEvent
}
const TransData  = {
	room: 'room',
	name: 'x-art',
	radius: 1,
	alpha: 2,
	beta: 3,
	target: [4,5,6],
	position:{x:'a',y:'b',z:'c'},
}

//消息传递
const messageStr = {
ButtonName:ButtonName
TransData:TransData
}

git remote add origin http://192.168.0.7:3000/myowngitea/React-Websocket-AndroidApp.git

全 -> 房
房 -> 云
```
## yarn 换源
//查看当前源
yarn config get registry
//设置淘宝源或内网源
yarn config set registry https://registry.npm.taobao.org --global
//恢复源
yarn config set registry https://registry.yarnpkg.com --global



ionic 404

## 命令
https://ionicframework.com/docs/developing/android
ionic serve  ***浏览器 模式***
ionic build  ***打包***
ionic capacitor copy android  ***打包到android***
npx cap sync ***同步***

ionic cordova build android  **编译debug版本**
ionic cordova build android --prod **prod优化代码提升运行速度**
ionic cordova prepare android
ionic cap open android
ionic cordova run android -l
