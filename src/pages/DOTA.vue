<template>
<Grid>
  <SidebarLeft />
  <SidebarRight />
  <div class="main">
    <h1>DOTA2</h1>
        <div class="grid-main">

    <ul v-for="(item, index) in $page.allDOTA2.edges" :key="item.id">
      <g-link :to="item.node.path">
        <li class="item-container grid-item">
          <img :Src="item.node.heroImgSrc" />
          <h2>{{ item.node.num }}: {{ item.node.name }}</h2>
          <div v-for="ability in item.node.abilities">
            <p>{{ ability }}</p>
          </div>
        </li>
      </g-link>
    </ul>
  </div>
  </div>
</Grid>
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

<style scoped>
.grid-main {
  max-width: 100vw;

  display: grid;
  background: rgba(0, 120, 240, 0.25);
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  grid-gap: 1ch;
  line-height: 1.5em;
}

.main {
  grid-area: main;
  min-height: 100vh;
}

.grid-item {
  text-align: center;
}

.item-author {
  /* min-height: 30px; */
  line-height: 1em;
  padding: 0;
  margin: 1em 0 0.5em 0;
  /* align-self: flex-start; */
  /* justify-self: center; */
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
