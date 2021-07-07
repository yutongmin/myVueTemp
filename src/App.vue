<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      routerArr: [{ name: 'Login' }]
    }
  },
  watch: {
    $route (to, from) {
      console.log('to', to)
      console.log('from', from)
      // const toIndex =
    }
  },
  created () {
    console.log('$route.meta', this.$route)
  }
}
</script>
<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
}

#app {
  font-family: "SourceHanSansCN-Regular", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fff;
  font-size: 0.15rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
