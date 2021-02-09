<template>
  <div id="app">
    <nav-bar />
    <div id="main">
      <!-- <router-view /> -->
      <p>Welcome to Vue!</p>
      <tabs-bar ></tabs-bar>
    </div>
    <!-- <router-link to="/">Home</router-link>-->
    <!-- <img src="./assets/images/parsed-image.png" /> -->
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';
  import TabsBar from './components/TabsBar.vue';

  export default {
    components: {
      'nav-bar': NavBar,
      'tabs-bar': TabsBar,
    },
  };
</script>

<style lang="scss">
  //Global styles
</style>
