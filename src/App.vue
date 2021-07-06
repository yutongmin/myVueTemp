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
      routerArr: [{ name: 'myHome' }]
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
