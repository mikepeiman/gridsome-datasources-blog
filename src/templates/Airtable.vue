<template>
<DSLayout>

    <h2>{{$page.post.resort}} Private Snowboard Lesson</h2>
    <p class="lesson-length">{{ $page.post.length }} hours</p>
    <p class="lesson-price">${{$page.post.price}} {{$page.post.currency}}</p>

</DSLayout>
</template>

<page-query>
query Airtable ($path: String!){
  post: airtable (path: $path){
    Resort
    Price
    Currency
    Length
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
  },
  metaInfo() {
    return {
      title: this.$page.post.title
    }
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

.posts-container .post-thumbnail-wrapper {

  .post-title,
  .post-subtitle {
    color: white;
    transition: .25s all ease-in-out;
  }
}

.posts-container .post-thumbnail-wrapper:hover {

  .post-title,
  .post-subtitle {
    color: $primary-blue;
    transition: .25s all ease-in-out;
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

.single-post .post-date {
  font-size: .8em;
  margin-bottom: .5em;
  color: rgba($primary-white, .5);
  border-bottom: 1px solid $primary-green;
}

.post-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-right: 1em;
  // border-top: 3px solid $primary-blue;
  padding-top: 1em;
}

.post-thumbnail-wrapper {}

.post-title {
  color: white;
  text-transform: uppercase;
  font-size: 2em;
  margin: 0;
  border-bottom: 3px solid $primary-blue;
}

.post-subtitle {
  line-height: 1.5em;
  margin: 0;
  padding: 0 0 1em 0;
}

.post-date {
  color: rgba($primary-white, 0.5);
  font-size: .8em;
}

.post-thumbnail {
  width: 90%;
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
