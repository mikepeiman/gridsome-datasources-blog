<template>
<div class="datasources">
  <DSHeader :pageName="pageName"></DSHeader>

  <slot />
</div>
</template>

<script>
import DSHeader from '~/components/DSHeader.vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';

export default {
  components: {
    DSHeader,
    Breadcrumbs
  },
  props: ['pageName'],
}
</script>

<style lang="scss" scoped>
.site-container {
  background: #252525;
  position: relative;
  grid-template-columns: 1fr 1fr 5fr 1fr;
  grid-template-rows: 60px 40px 1fr;
  grid-template-areas:
  ". . . ."
    ". . breadcrumbs ."
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
