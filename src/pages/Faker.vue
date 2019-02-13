<template>
<Grid>
  <SidebarLeft />
  <SidebarRight />
  <div class="main">
    <div class="grid-main">
      <div class="grid-item" v-for="(item, index) in $page.allFaker.edges" :key="index">
        <p class="item-author">{{item.node.author}}</p>
        <img class="item-img" :src="item.node.avatar.src" width="200">
        </div>
      </div>
  </div>
</Grid>
</template>

<page-query>
{

allFaker(perPage: 50, sortBy: "author", order: ASC ) {
    edges {
      node {
        author
        email
        avatar
      }
    }
  }
}
</page-query>

<script>
import Grid from '~/layouts/Grid.vue';
import SidebarLeft from '~/components/SidebarGalleryLeft.vue';
import SidebarRight from '~/components/SidebarGalleryRight.vue';

export default {
  components: {
    Grid,
    SidebarLeft,
    SidebarRight
  }
}
</script>

<style scoped>
.grid-main {
  max-width: 100vw;
  display: grid;
  background: rgba(0, 120, 240, 0.25);
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  grid-gap: 1ch;
}
.main {
  grid-area: main;
}

.grid-item {
  text-align: center;
}
.item-author {
  /* min-height: 30px; */
  line-height: 1em;
  padding: 0;
  margin: 1em 0 .5em 0;
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
