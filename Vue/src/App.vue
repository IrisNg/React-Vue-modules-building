<template>
  <div id="app">
    <nav-bar />
    <div id="main">
      <!-- <router-view /> -->
      <p>Welcome to Vue!</p>
    </div>
    <!-- <router-link to="/">Home</router-link>-->
      <!-- <img src="./assets/images/parsed-image.png" /> -->
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
//Global styles
</style>
