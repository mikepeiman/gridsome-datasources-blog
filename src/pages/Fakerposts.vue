<template>
<DSLayout pageName="Faker " id="ds-faker">

      <h1 class="page-title">Faker</h1>
      <div class="grid-main">
        <div class="grid-item" v-for="(item, index) in $page.allFaker.edges" :key="index">
          <g-link :to="`/faker-posts/${item.node.id}`">
            <p class="item-author">{{item.node.author}}</p>
            <img class="item-img" :src="item.node.avatar" width="200">
        </g-link>
        </div>
      </div>

</DSLayout>
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
        id
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
  height: calc(100vh - 70px);
}

.grid-main {
  /* max-width: 100vw; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: auto;
  grid-template-areas: "";
  grid-gap: 1ch;
}
.content {
  grid-area: main-content;
  color: white;
}

// .main {
//   grid-area: main;
// }

.grid-item {
  text-align: center;
  color: white;
}

.item-author {
  line-height: 1em;
  padding: 0;
  margin: 1em 0 .5em 0;
  color: white;
  min-height: 2em;
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
