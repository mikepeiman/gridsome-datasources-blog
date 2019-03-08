<template>
<Layout>
  <!-- <SidebarLeft />
  <SidebarRight /> -->
  <div class="main">
    <h1>DOTA2</h1>
        <div class="grid-main">

    <ul class="hero-list" v-for="(item, index) in $page.allDOTA2.edges" :key="item.id">
      <g-link :to="item.node.path">
        <li class="item-container grid-item">
                    <div class="hero-number">{{ item.node.num }}</div>
          <div class="hero-number-bg">
            <h2 class="hero-name">{{ item.node.name }}</h2>
          </div>

          <img class="hero-image" :Src="item.node.heroImgSrc" />
          
          <div  class="abilities-list" v-for="ability in item.node.abilities">
            <p class="single-ability">{{ ability }}</p>
          </div>
        </li>
      </g-link>
    </ul>
  </div>
  </div>
</Layout>
</template>

<page-query>
{
  allDOTA2 (sortBy: "num", order: DESC, perPage: 120) {
    edges {
      node {
        num
        name
        abilities
        path
        heroImgSrc
      }
    }
  }
}
</page-query> 

<script>
import Grid from "~/layouts/Grid.vue";
import SidebarLeft from "~/components/SidebarGalleryLeft.vue";
import SidebarRight from "~/components/SidebarGalleryRight.vue";

export default {
  components: {
    Grid,
    SidebarLeft,
    SidebarRight
  }
};
</script>

<style scoped lang="scss">
@import "./../assets/colors.scss";

.grid-main {
  max-width: 84vw;
  margin-right: 8vw;
  display: grid;
  // background: rgba(0, 120, 240, 0.25);
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-template-rows: auto;
  grid-gap: 5px;
  line-height: 1em;
  ul li {
    padding: 0;
  }
}

.main {
  grid-area: main;
  min-height: 100vh;
}

.grid-item {
  text-align: center;
  padding: 0;
  margin: 0 0 1em 0;
}
.hero-list {
  padding: 0;
  margin: 0;
}
.hero-image {
  width: 50px;
  min-width: 50px;
  max-width: 100px;
  width: 100%;
  padding: 0;
  margin: 0;
  // justify-self: left;
}
.hero-number {
  font-size: .5em;
  font-weight: 300;
  margin: 0;
  padding: 0 0 5px 0;
  position: relative;
  top: 0px;
  height: 10px;
  width: 18px;
  // border-radius: 0 0 3px 0;
  border: 1px solid $primary-green;
  left: 1px;
  background: $primary-graphite;
  z-index: -1;
  color: rgba($primary-white, .5);
}
.hero-number-bg {
  font-size: .5em;
  font-weight: 300;
  margin: 0;
  padding: 0px 3px;
  position: relative;
  // top: 14px;
  background: $primary-graphite;
  min-width: calc(50px-.4em);
  width: calc(100% -5px);
  // margin-right: 1em;
  height: 14px;
  height: auto;
  // width: 100%;
  // border-radius: 0 0 3px 0;
  border: 1px solid black;
  left: 0px;
  z-index: -2;
}
.hero-name {
  font-size: 1em;
  padding: 0 0 .5em 0;
  margin: 3px 0 0 -6px;
  line-height: 1em;
  color: $primary-blue;
}
.hero-image {
  padding: 0 0 5px 0;
  border-bottom: 1px solid $primary-green;
}
.single-ability {
  font-size: 0.5em;
  // font-family: monospace;
  text-align: left;
  line-height: 1em;
  ::before {
    content: '-';
    color: white;
  }
}

.item-img {
  max-width: 100px;
  height: auto;
  top: 0;
  background-size: contain;
  align-self: flex-end;
  justify-self: center;
}

</style>
