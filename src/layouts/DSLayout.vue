<template>
<div class="datasources">
  <DSHeader :pageName="pageName"></DSHeader>
  <div class="site-container">
    <DSSideBar />
    <Breadcrumbs />
    <div class="content">
      <slot />
    </div>
  </div>
</div>
</template>

<script>
import DSHeader from '~/components/DSHeader.vue';
import DSSideBar from '~/components/DSSideBar.vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';
var changeCase = require('change-case')

export default {
  components: {
    DSHeader,
    DSSideBar,
    Breadcrumbs
  },
  props: ['pageName'],
  data: function () {
    return {
      linkSet: [],
      activeLink: '',
      route: this.$route.name,
      hero: this.$route.params.hero,
      ability: this.$route.params.name,
    }
  },
  created() {
    let route = this.$route.name
    let hero = this.$route.params.hero
    let ability = this.$route.params.name
    console.log(`DSLayout ||| route: ${route}, hero: ${hero}, ability: ${ability}`)
    let routesLength = this.$route.matched.length
    let routeArray = Array.from(this.$route.matched)
    console.log(this.$route)
  },
  metaInfo() {
    return {
    title: changeCase.title(this.$route.name) + " | Data Sources",
    titleTemplate: '%s | MikePeiman.com'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";

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

.content {
  grid-area: main-content;
  color: white;
}

.page-title {
  line-height: 1.5em;
  border-bottom: 3px solid $primary-blue;
  margin-bottom: 1em;
  color: white;
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
