<template>
<DSLayout pageName="Airtable">

      <h1 class="page-title">Airtable</h1>
      <ul class="posts-container">
        <li class="single-post" v-for="(lesson, index) in $page.allAirtable.edges" :key="index">
          <g-link :to="lesson.node.path">
          <h2 class="post-title">{{ lesson.node.resort }}</h2>
          <p class="lesson-price">${{ lesson.node.price }}</p>
          <p>{{ lesson.node.private }}</p>
          </g-link>
        </li>
      </ul>

</DSLayout>
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
  line-height: 1.5em;
  border-bottom: 3px solid $primary-blue;
  margin-bottom: 1em;
}

.content {
  grid-area: main-content;
  color: white;
}

.posts-container {
  padding: 0;
  margin: 0;
  margin-bottom: 1em;
}

.single-post {
  margin-bottom: 2em;
}

.post-body {
  color: rgba($primary-white, .5);
}

.post-title {
  color: rgba($primary-blue, .75);
  text-transform: capitalize;
}

.posts-container li {
  width: 100%;
  .post-title {
    padding-left: 0em;
    transition: .25s all ease-in-out;
  }
}

.posts-container li:hover {
  // width: calc(100% - 1em);
  .post-title {
    padding-left: .5em;
    transition: .25s all ease-in-out;
  }
  .post-body {
  color: rgba($primary-white, 1);
  }
}


.single-post a {
  color: white;
  font-weight: 300;
  line-height: 1.25em;
}

.single-post p {
  margin: 0;
}

.single-post .post-title {
  margin: 0;
}

.single-post .post-date,
.single-post .lesson-price {
  font-size: .8em;
  margin-bottom: .5em;
  color: rgba($primary-white,.5);
  border-bottom: 1px solid $primary-green;
}

.post-title {
  color: rgba($primary-green, .75);
  text-transform: capitalize;
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