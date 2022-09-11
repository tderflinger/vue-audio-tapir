# vue-audio-tapir [![npm](https://img.shields.io/npm/v/vue-audio-tapir)](https://www.npmjs.com/package/vue-audio-tapir) [![npm](https://img.shields.io/npm/l/vue-audio-tapir)](https://www.npmjs.com/package/vue-audio-tapir)  

<div style="text-align: right"><a href="./README.md">English</a></div>
<br/>

Vue.js 3的音频记录器组件。它能够录制、播放并向服务器发送音频信息。
有一个相应的无服务器的后端函数叫 [audio-tapir-function](https://github.com/tderflinger/audio-tapir-function)。
你可以将两者结合起来使用，向你发送带有录音信息的电子邮件。

<img src="./docs/the-tapir-color-new.png" style="display: block; margin: 40px auto; width: 200px" />

## 演示

音频貘的[演示页面](https://tderflinger.github.io/vue-audio-tapir/)。
你可以录制和播放音频，但提交被禁用。

## 使用案例

vue-audio-tapir最流行的使用案例是将音频联系信息直接从网站传递给
音频联系信息直接从一个网站传递到你的邮箱里。

<img src="./docs/screenshot.png" style="display: block; margin: 40px auto; width: 300px" />
 
## 架构概述

<img src="./docs/architecture-overview.png" style="display: block; margin: 40px auto; width: 550px" />

开发者在他的Vue 3网站中包含了vue-audio-tapir组件。当该网站的用户
想留下语音信息时，他录下他的信息并提交。Vue-audio-tapir联系
后台服务器，一个Netlify的无服务器功能并上传音频数据。无服务器的后端功能
使用电子邮件服务Sendgrid将音频数据发送到一个电子邮件地址。
最后，带有语音信息的电子邮件到达了目的地，可能是网站所有者的电子邮件应用程序。
网站所有者的电子邮件应用程序。

## 安装

在一个Vue 3应用程序中，用以下方式安装。

```bash
npm i vue-audio-tapir -save
```

或
```bash
yarn add vue-audio-tapir --save
```

## 使用实例

```html
<template>
  <tapir-widget :time="2" backendEndpoint="https://your-endpoint.com/.netlify/functions/audio-message" 
                buttonColor="green"/>
</template>

<script>
import TapirWidget from 'vue-audio-tapir';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';

export default {
  name: 'App',
  components: {
    TapirWidget,
  }
}
</script>
```


## 属性

| 名称 | 类型 | 描述 | 
|------------------|----------|---------------------------------------------------|
| time             | Number   | 最大记录时间（分钟）                                 |
| bitRate          | Number   | 记录的比特率                                        |
| sampleRate       | Number   | 录音的采样率                                        |
| backendEndpoint  | String   | 以POST方式接收数据的服务的URL                         |
| buttonColor      | String   | 用于制作主题的按钮的颜色代码             |
| afterRecording   | Function | 当录制完成后的回调函数。     |
| successfulUpload | Function | 当数据成功上传时调用的回调函数。 |
| failedUpload     | Function | 当上传失败时调用的回调函数。 |

发送到服务器的数据被编码为MP3格式，以便有效存储。
对于MP3编码，使用的是[lamejs](https://github.com/zhuker/lamejs)库。

## 依赖性

- [Vue 3](https://v3.vuejs.org/)
- [Tailwindcss](https://tailwindcss.com/)

## 更多信息

在Twitter上关注我的更新。[@tderflinger](https://twitter.com/tderflinger)

你可以在我的博客上阅读更多关于音貘项目的信息。

https://www.tderflinger.com/en/easily-receive-audio-messages-from-users


## 参考文献

这个项目的灵感来自[vue-audio-recorder](https://github.com/grishkovelli/vue-audio-recorder) 作者：Gennady Grishkovtsov。


## 许可证

MIT许可
