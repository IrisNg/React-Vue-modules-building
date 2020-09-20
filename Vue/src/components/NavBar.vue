<template>
  <div class="nav-bar">
    <ul class="nav-bar__links">
      <li v-for="link in links" :key="link.url">
        <router-link :to="link.url" active-class="active">
          <i :class="['icon', link.icon]" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          url: "/scheduler",
          icon: "icon-calendar"
        },
        {
          url: "/todo",
          icon: "icon-list-ol"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
