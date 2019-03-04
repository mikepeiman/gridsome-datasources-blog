<template>
<Grid>
  <SidebarLeft />
  <SidebarRight />
  <div class="main">
    <ul v-for="(post, index) in $page.allGraphCMS.edges" :key="index">
      <li class="post-container">
        <g-link :to="post.node.path">
          <h2 class="post-title">{{ post.node.title }}</h2>
        </g-link>
        <h3 class="post-subtitle">{{ post.node.subtitle }}</h3>
        <img :src="post.node.imageUrl" width="95%">
        <p class="post-date">{{ post.node.datePublished }}</p>
        <p class="post-body">{{ post.node.body }}</p>
      </li>
    </ul>
  </div>
</Grid>
</template>

<page-query>
{
  allGraphCMS {
    edges {
      node {
        title
        subtitle
        datePublished
        imageUrl
        body
        path
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
  },
  // data: function() {
  //   const baseUrl = 'https://media.graphcms.com';
  //   const imageSrc = '';
  //   return {

  //     imageSrc: baseUrl + $page.imageSrc
  //   }
  // },
  Created: function () {
    console.log('Queries: ', page.node)
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

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #252525;
  line-height: 3.5em;
  letter-spacing: -0.05ch;
}

.item-author {
  /* min-height: 30px; */
  line-height: 1em;
  padding: 0;
  margin: 1em 0 .5em 0;
  /* align-self: flex-start; */
  /* justify-self: center; */
}

.post-title {
  font-size: 3em;
  text-align: center;
  font-family: 'Montserrat';
}

.post-date {
  font-size: .9em;
  text-align: center;
  font-family: 'Montserrat';
}

.post-body {
  line-height: 1.45em;
  font-family: 'Roboto';
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
