<template>
<Layout>
  <div class="site-container">
    <div class="content">
      <h1 class="site-title">Faker Data Source</h1>
      <div class="grid-main">
        <div class="grid-item" v-for="(item, index) in $page.allFaker.edges" :key="index">
          <g-link :to="item.node.path">
            <p class="item-author">{{item.node.author}}</p>
            <img class="item-img" :src="item.node.avatar.src" width="200">
        </g-link>
        </div>
      </div>
    </div>
  </div>
</Layout>
</template>

<page-query>
{
allFaker(perPage: 50, sortBy: "author", order: ASC ) {
    edges {
      node {
        author
        email
        avatar
        path
        slug
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

.site-container {
  background: #252525;
  background-size: cover;
  background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-blue, 0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 1fr 2fr 2em 7fr 1fr;
  grid-template-areas: ". . . . ."". main-content main-content main-content .";
  grid-template-rows: minmax(100px, 1fr) auto 1fr;
}

#contact-us-layout {
  color: white;
  min-height: 100%;
  width: 100%;
}

.content {
  grid-area: main-content;
  color: white;
}

.grid-main {
  /* max-width: 100vw; */
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
  grid-template-areas: "";
  grid-gap: 1ch;
}

.main {
  grid-area: main;
}

.grid-item {
  text-align: center;
  color: white;
}

.item-author {
  line-height: 1em;
  padding: 0;
  margin: 1em 0 .5em 0;
  color: white;
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
