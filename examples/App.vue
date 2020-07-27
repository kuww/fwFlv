<template>
  <div id="app">
    <fw-video
      src="ws://192.168.210.113:8089/ws/live/16149334"
      @reload="reload"
      :key="key"
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
      console.log(3);
      this.key = ++this.key;
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
}
</style>
