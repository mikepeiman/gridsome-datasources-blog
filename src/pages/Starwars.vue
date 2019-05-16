<template>
<DSLayout pageName="SWAPI">

      <h1 class="page-title">Star Wars API</h1>
      <ul class="swapi-single">
        <li class="item-container" v-for="(item, index) in $page.allSWAPI.edges" :key="item.id">
          <g-link class="item-link" :to="item.node.path">
            <h2>{{ item.node.name }}</h2>
            <p>{{ item.node.starshipClass }}</p>
          </g-link>
        </li>
      </ul>

</DSLayout>
</template>

<page-query>
{
allSWAPI {
  edges {
    node {
      id
      name
      starship_class
      path
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

<style lang="scss" scoped>
@import "./../assets/colors.scss";

.site-container {
  background: #252525;
  height: calc(100vh - 70px);
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

.item-link {
  
}

.swapi-single .item-container {
  line-height: 1em;
  background: rgba($primary-blue, 0.25);
  color: white;
  :visited {
    color: white;
  }
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
