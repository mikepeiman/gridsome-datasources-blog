<template>
<Grid>
  <SidebarLeft />
  <SidebarRight />
  <div class="main">
    <ul v-for="(lesson, index) in $page.allAirtable.edges" :key="index">
<g-link :to="lesson.node.path">
        <li class="lesson-container">
          <h2>{{ lesson.node.resort }}</h2>
          <p class="lesson-price">${{ lesson.node.price }}</p>
          <p>{{ lesson.node.url }}</p>
        </li>
</g-link>
    </ul>
  </div>
</Grid>
</template>

<page-query>
{ allAirtable 
  {
  edges {
    node {
      private
      price
      length
      url
      resort
      path
      pricePerHour {
        specialValue
      }
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
  height: 100vh;
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

li {
  list-style: none;

}
a {
  text-decoration: none;
  line-height: 1em;
}
</style>
