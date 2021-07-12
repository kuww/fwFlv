<template>
  <div class="video">
    <div class="poster_mask" v-if="poster_show">
      <div class="poster" v-if="!errStr">
        <slot>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="30px"
              height="30px"
              viewBox="0 0 50 50"
              style="enable-background:new 0 0 0 50"
              xml:space="preserve"
            >
              <path
                fill="#ffffff"
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                transform="rotate(275.098 25 25)"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"
                ></animateTransform>
              </path>
            </svg>
            <p class="loading_title">
              加载中...
            </p>
          </div>
        </slot>
      </div>
      <div class="poster" v-else>
        <div v-if="errorShow">
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            style="enable-background:new 0 0 0 50"
          >
            <path
              fill="#ffffff"
              d="M910.336 186.368l-72.704-72.704L512 439.808 186.368 113.664 113.664 186.368 439.808 512l-326.144 325.632 72.704 72.704L512 584.192l325.632 326.144 72.704-72.704L584.192 512l326.144-325.632z"
            ></path>
          </svg>
          <p class="error_title">
            {{ errStr }}
          </p>
        </div>
      </div>
    </div>
    <video
      :id="id"
      :muted="muted"
      :autoplay="isLive"
      @dblclick.prevent="btnFull"
      @click="onlyBtnFull"
    ></video>
    <div class="video_btn_dom" v-if="!poster_show">
      <svg
        t="1595225152583"
        class="icon"
        viewBox="0 0 1075 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2198"
        width="32"
        height="32"
        @click="btnFull"
        v-if="full"
      >
        <path
          d="M993.949618 0.102385a39.418068 39.418068 0 0 1 39.366876 39.418067v306.897812a39.418068 39.418068 0 1 1-78.784943 0V134.584545L700.361803 388.651908a39.264491 39.264491 0 0 1-64.195138-12.798074 39.418068 39.418068 0 0 1 8.497921-42.847951l254.220939-254.22094H687.051806a39.418068 39.418068 0 1 1 0-78.733751h306.897812zM380.665917 624.597198a39.418068 39.418068 0 0 1 17.405381 66.396407L143.901551 945.214545h211.936103a39.418068 39.418068 0 1 1 0 78.733751H48.786265a39.418068 39.418068 0 0 1-39.418067-39.418068v-306.897812a39.418068 39.418068 0 1 1 78.836135 0v211.833719l254.118555-254.118555c9.880113-10.238459 24.572302-14.333843 38.291837-10.750382zM39.469268 0.102385A39.418068 39.418068 0 0 0 0.0512 39.520452v306.897812a39.418068 39.418068 0 1 0 78.733751 0V134.584545L333.00589 388.651908a39.264491 39.264491 0 0 0 64.195139-12.798074 39.418068 39.418068 0 0 0-8.549113-42.847951L134.482168 78.836135h211.833719a39.418068 39.418068 0 1 0 0-78.73375H39.469268z m613.795623 624.494813a39.418068 39.418068 0 0 0-17.40538 66.396407l254.169747 254.22094h-211.936103a39.418068 39.418068 0 1 0 0 78.733751h307.000196a39.418068 39.418068 0 0 0 39.366875-39.418068v-306.897812a39.418068 39.418068 0 1 0-78.784942 0v211.833719l-254.169748-254.118555a39.315683 39.315683 0 0 0-38.291837-10.750382z"
          fill="#ffffff"
          p-id="2199"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import flvPlayer from "flv.js";
export default {
  name: "fw-video",
  props: {
    id: {
      default: "id",
      type: String,
    },
    src: {
      default: "",
      type: String,
      required: true,
    },
    isLive: {
      default: true,
      type: Boolean,
    },
    type: {
      default: "flv",
      type: String,
    },
    hasAudio: {
      default: false,
      type: Boolean,
    },
    width: {
      default: 800,
      type: Number,
    },
    height: {
      default: 400,
      type: Number,
    },
    muted: {
      default: true,
      type: Boolean,
    },
    full: {
      default: true,
      type: Boolean,
    },
    loadingStr: {
      default: ``,
      type: String,
    },
    liveRetry: {
      default: 50,
      type: Number,
    },
    loadingTime: {
      default: 10,
      type: Number,
    },
    errorShow: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      flvPlayer: null,
      videoElement: null,
      poster_show: true,
      errStr: "",
      cleanBuff: null,
      mediaSource: null,
      mediaSourceObjectURL: null,
      ws: null,
      receiveData: "",
      receiveTime: null,
      anReceiveData: null,
      loadingTimer: null,
    };
  },
  methods: {
    init() {
      if (flvPlayer.isSupported()) {
        try {
          this.videoElement = document.getElementById(this.id);
          var videoSrc = this.src;
          var isLive = this.isLive;
          var hasAudio = this.hasAudio;
          var type = this.type;
          this.flvPlayer = flvPlayer.createPlayer(
            {
              url: videoSrc,
              isLive: isLive,
              type: type,
              hasAudio: hasAudio,
            },
            {
              enableWorker: true,
              enableStashBuffer: false,
              stashInitialSize: 128, // 减少首桢显示等待时长
            }
          );
          this.flvPlayer.attachMediaElement(this.videoElement);
          this.flvPlayer.load();
          this.flvPlayer.play();

          this.loadingTimer = setTimeout(() => {
            this.$emit("reload", this.id);
            // console.log("掩饰");
          }, this.loadingTime * 1000);
        } catch (e) {
          console.log(e);
        }
      }
    },
    btnFull() {
      if (!this.isLive) return false;
      if (document.fullscreenElement !== this.videoElement) {
        if (this.videoElement.requestFullscreen) {
          this.videoElement.requestFullscreen();
        } else if (this.videoElement.mozRequestFullScreen) {
          this.videoElement.mozRequestFullScreen();
        } else if (this.videoElement.webkitRequestFullscreen) {
          this.videoElement.webkitRequestFullscreen();
        } else if (this.videoElement.msRequestFullscreen) {
          this.videoElement.msRequestFullscreen();
        }
      } else {
        if (document.exitFullScreen) {
          document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },
    onlyBtnFull(e) {
      if (this.isLive) {
        e.preventDefault();
        return;
      }
    },

    changeData() {
      // console.log(3)
      this.$emit("reload", this.id);
    },

    visibilitychange() {
      var hidden;
      var visibilityChange;
      var visible;
      var state;
      if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
        visible = "visible";
        state = "visibilityState";
      } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
        visible = "mozVisibilityState";
        state = "mozVisibilityState";
      } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
        visible = "msVisibilityState";
        state = "msVisibilityState";
      } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
        visible = "webkitVisibilityState";
      }
      let _this = this;
      document.addEventListener(
        visibilityChange,
        function() {
          if (document[state] === visible) {
            // console.log(this)
            if (_this.videoElement) {
              let buffered = _this.videoElement.buffered;
              // console.log(buffered)
              if (buffered.length > 0) {
                let end = buffered.end(0);
                if (end - _this.videoElement.currentTime > 0.15) {
                  _this.videoElement.currentTime = end - 0.1;
                }
              }
            }
          } else if (document[state] === hidden) {
            // console.log(33)
          }
        },
        false
      );
    },
    playerStateError() {
      this.flvPlayer.on("error", (err) => {
        // this.handleLiveRetry();
        this.handleErrorTips(err);
        this.$emit("error", err);
      });
    },
    handleErrorTips(err) {
      // if(!this.errorShow) return
      console.log(err);
      var that = this;
      if (err === "NetworkError") {
        that.errStr = "视频流错误";
      } else if (err === "MediaError") {
        that.errStr = "播放器错误";
      } else if (err === "OtherError") {
        that.errStr = "未知错误";
      }
    },
    jumpToEndBuffer() {
      if (this.videoElement) {
        let buffered = this.videoElement.buffered;
        if (buffered.length > 0) {
          let end = buffered.end(0);
          if (end - this.videoElement.currentTime > 0.15) {
            this.videoElement.currentTime = end - 0.1;
          }
        }
      }
    },
  },
  watch: {
    poster_show: {
      handler(val) {
        if (!val) {
          let _ws = this.flvPlayer._transmuxer._controller._ioctl._loader;
          let that = this;
          _ws.on("message", function(e) {
            if (that.loadingTimer) {
              window.clearTimeout(that.loadingTimer);
              that.loadingTimer = null;
            }
            if (e) {
              window.clearTimeout(that.receiveTime);
              // console.log(that.loadingTime)
              that.receiveTime = setTimeout(
                that.changeData,
                that.loadingTime * 1000
              );
            }
          });
          _ws.on("error", function() {
            if (that.loadingTimer) {
              window.clearTimeout(that.loadingTimer);
              that.loadingTimer = null;
            }
            that.changeData;
          });
        }
      },
    },
  },
  mounted() {
    this.init();
    var that = this;
    // let _ws = this.flvPlayer;
    // console.log(_ws);
    this.videoElement.addEventListener("progress", function() {
      if (that.flvPlayer.buffered.length > 0) {
        that.poster_show = false;
        if (that.loadingTimer) {
          window.clearTimeout(that.loadingTimer);
          that.loadingTimer = null;
        }
      } else {
        that.poster_show = true;
      }
    });
    this.visibilitychange();
    this.playerStateError();
    this.cleanBuff = setInterval(this.jumpToEndBuffer, 120 * 10 * 1000);
  },
  beforeDestroy() {
    if (this.loadingTimer) {
      window.clearTimeout(this.loadingTimer);
      this.loadingTimer = null;
    }

    this.flvPlayer.pause();
    this.flvPlayer.unload();
    this.flvPlayer.detachMediaElement();
    this.flvPlayer.destroy();
    this.flvPlayer = null;
    this.mediaSource = null;
    window.clearInterval(this.cleanBuff);
    window.clearTimeout(this.receiveTime);
    this.cleanBuff = null;
  },
};
</script>

<style scoped>
video {
  background-color: black;
}
.video {
  position: relative;
  width: 100%;
  height: 100%;
}
.video_btn_dom {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: none;
  cursor: pointer;
}
.video:hover .video_btn_dom {
  display: block;
}
.poster {
  color: white;
}
.video video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.poster_mask {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

video::-webkit-media-controls-fullscreen-button {
  display: none !important;
}

/*video默认aduio音量按钮*/
video::-webkit-media-controls-mute-button {
  display: none !important;
}

/*video默认aduio音量按钮*/
video::-webkit-media-controls-play-button {
  display: none !important;
}

/*video默认setting按钮*/
video::-webkit-media-controls-overflow-button {
  display: none !important;
}

video::-webkit-media-controls-enclosure {
  display: none !important;
}
</style>

<style>
.loading_title,
.error_title {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
</style>
