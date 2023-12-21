<template>
  <div id="app">
    <keep-alive include='search'>
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
export default {
  name: "app",
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style>
</style>
