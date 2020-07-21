# fwFlv

基于 flv 的 vue 视频播放器

在 main.js 引入下面代码

```javascript
import fwflv from "fwflv";
import "fwflv/lib/fwflv.css";
Vue.use(fwflv);
```

在需要用的地方

```html
<fw-video src="url"></fw-video>
```

## 设置参数

full 控制全屏按钮是否展示 默认 true

id video 的 id 默认 id

width 默认 800

height 默认 800

src 视频连接

hasAudio 是否有声音 默认 false 不建议修改

muted 是否静音 默认静音 由于谷歌在设置自动播放的时候，需要静音

type 视频的类型 默认 flv

liveRetry 播放失败重试 默认5次

是否直播 默认 true

slot 设置加载效果
