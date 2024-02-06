# watermark-pub

`watermark-pub`是一个通用的水印库，项目运用 rollup 构建，输出 iife、cjs、esm 三个压缩文件
鸣谢@saucxs https://github.com/saucxs/watermark-dom
在 watermark-dom 基础上增加 支持多行，动态水印，提供根据文本计算水印宽高的方法，可设置水印疏密度...
![Alt text](https://raw.githubusercontent.com/wj100/cdn/main/img/watermark.png)

## 一、使用方法

### 1、本地引入 js 文件

第一步：在页面中引入水印文件

```
<script type="text/javascript" src=""></script>
```

第二步：在确保页面 DOM 加载完毕之后，调用 watermark 方法

```
watermarkObj.watermark({ text: "测试水印" })
```

### 2、npm 包引入

第一步：npm 获取水印包

```
npm install watermark-pub --save
# yarn add watermark-pub
```

第二步：引入水印模块

```
import { watermark } from 'watermark-com'
// const watermark = require('watermark-com')
```

第三步：在确保页面 DOM 加载完毕之后，调用 watermark 方法

```
watermark({ text: "测试水印" })
```

注意：当需要加水印的内容部分有滚动的情况，我们建议在需要加载水印的容器下加一个：

```
<div id='watermarkId'>content</div>
```

把需要加水印的内容部分包裹起来，以这个 div 当做水印元素的父节点，content 为需要加水印的内容节点

## 二、配置项

```
{
    id: 'g65sdk7opgj6er', // 水印总体的id
    text: '小易@网易科技有限公司\nwangjun123\n自定义信息自定义信息自定义信息', // 水印的内容 使用\n换行
    color: `rgba(112, 113, 114, .1)`,
    density: 50,//水印疏密 100 为铺满，指定singleWidth和singleHeight则不生效
    densityBase: 1,//水印疏密系数，为 1 时，[稀疏] 是 密集的 1+1*1=2；为 2 时，[稀疏] 是 密集的 1+1*2=3
  //以下参数非必填
  parentLeft: 0, // 水印整体左边距离
  parentTop: 0, // 水印整体顶边距离
  parentRight: 0, // 水印整体右边距离
  parentBottom: 0, // 水印整体顶边距离
  singleWidth: 200, // 单个水印宽度
  singleHeight: 200, // 单个水印长度
  slope: -30, // 水印倾斜度数
  zIndex:999,//水印层级
  parentSelector: null, // 水印插件挂载的父元素选取器,不输入则默认挂在body上
}
```

注意：

- 若 watermark()没有传任何配置则使用的是以上的默认配置，常用的配置项是 text，若对水印的样式有要求的可自行传入相关的配置项。
- parentSelector 不传则默认挂在 body 上。
- 若挂载在 body 下，水印不会随着内容的滚动而滚动，若挂载到滚动的内容上则可以随着内容的滚动而滚动，可根据需求自行选择。
- 加水印后有可能会影响到内容的绝对定位，若有影响需调整页面样式。

## 三、浏览器支持情况

Chrome、FireFox、Safari、IE10 及以上浏览器支持全部功能

IE10 及以下不支持水印被用户手动调用开发者工具删除水印 dom 的情况

## 四、提供方法

#### 生成水印

watermark(config)

#### 删除水印

removeWatermark(watermarkId)

#### 获取水印配置

getWatermarkConfig(watermarkId)

#### 动态计算水印宽高

多行不固定文本时根据文字动态计算水印宽高 可配置水印疏密度
getSingleWH(text,density?,densityBase?)('width')
