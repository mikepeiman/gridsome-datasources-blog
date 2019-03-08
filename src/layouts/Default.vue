<template>
  <div>
    <Header></Header>
    <slot />
  </div>
</template>

<script>
import Header from '~/components/Header.vue';

export default {
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
.site-container {
  color: #252525;
}

/* 
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
  text-decoration: none;
} */

.site-title {
  text-decoration: none;
}

li {
  list-style: none;
  /* margin-bottom: 2em;
  border-bottom: 3px solid #00ccff; */
}

a {
  text-decoration: none;
  line-height: 1em;
}
</style>
