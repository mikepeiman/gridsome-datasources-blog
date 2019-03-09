<template>
<div class="datasources">
  <DSHeader></DSHeader>
  <!-- <DSSideBar></DSSideBar> -->
  <slot />
</div>
</template>

<script>
import DSHeader from '~/components/DSHeader.vue';
import DSSideBar from '~/components/DSSideBar.vue';

export default {
  components: {
    DSHeader
  }
}
</script>

<style lang="scss" scoped>
.site-container {
  background: #252525;
  grid-template-columns: 1fr 1fr 5fr 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
    ". . . ."
    "sidenav . main-content .";
}

.page-title {
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
