<template>
<DSLayout>
  <div class="site-container">
    <DSSideBar />
    <div class="content">
      <h1 class="page-title">File System (markdown)</h1>
    <ul v-for="(post, index) in $page.allPost.edges" :key="index">
      <li class="post-container">
        <g-link :to="`/blog/${post.node.slug}`">
        <h2>{{ post.node.title }}</h2>
        <h3>{{ post.node.description }}</h3>
        <p class="post-date">{{ post.node.date }}</p>
        <p>{{ post.node.excerpt }}</p>
        </g-link>
      </li>
    </ul>
    </div>
  </div>
</DSLayout>
</template>

<page-query>
{
allPost {
  edges {
    node {
      id
      title
      excerpt
      description
      content
      timeToRead
      date
      slug
    }
  }
}
}
</page-query>

<script>
import DSLayout from '~/layouts/DSLayout.vue';
import DSSideBar from '~/components/DSSideBar.vue';

export default {
  components: {
    DSLayout,
    DSSideBar,  
  }
}
</script>

<style scoped lang="scss">
@import "./../assets/colors.scss";

.site-container {
  background: #252525;
  // background-size: cover;
  // background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-blue, 0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  height: calc(100vh - 70px);
}

#contact-us-layout {
  color: white;
  min-height: 100%;
  width: 100%;
}
.page-title {
  // margin: .5em;
  line-height: 1.5em;
  border-bottom: 3px solid $primary-blue;
  margin-bottom: 1em;
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
