<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="less">
    html,body,h3,p{     //去除默认样式
      margin: 0;
      padding: 0;
    }
    body{
      height: 100%;
    }
</style>
