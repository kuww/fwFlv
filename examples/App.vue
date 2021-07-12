<template>
  <div id="app">
    <fw-video
      src="ws://192.168.8.202:8089/ws/live/14120809"
      @reload="reload"
      :key="key"
      @error="error"
      :errorShow="true"
    >
    </fw-video>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      key: 1,
    };
  },
  methods: {
    reload() {
      // console.log(3);
      this.key = ++this.key;
    },
    error() {
      console.log("3333");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 300px;
}
</style>
