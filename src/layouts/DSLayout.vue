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
      test: this.$route.name,
      hero: this.$route.params.hero,
      ability: this.$route.params.name
    }
},
  created() {
    test: 'DSLayout test'
    let test = this.$route.name
    let hero = this.$route.params.hero
    let ability = this.$route.params.name
    console.log(`DSLayout ||| Test: ${test}, hero: ${hero}, ability: ${ability}`)
    let routesLength = this.$route.matched.length
    let routeArray = Array.from(this.$route.matched)
    console.log(`DSLayout created() this.$route.matched[0].name: ${this.$route.matched[0].name}`)
    console.log(this.$route)
  },
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
