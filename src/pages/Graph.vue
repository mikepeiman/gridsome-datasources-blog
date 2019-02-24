<template>
<Grid>
  <SidebarLeft />
  <SidebarRight />
  <div class="main">
    <ul v-for="(post, index) in $page.allGraphCMS.edges" :key="index">
      <li class="post-container">
        <h2 class="post-title">{{ post.node.title }}</h2>
        <p class="post-date">{{ post.node.date }}</p>
        <p class="post-body">{{ post.node.content }}</p>
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
        excerpt
        content
        title
				content
        id
        date
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

li {
  list-style: none;
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
