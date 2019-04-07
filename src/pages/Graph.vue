<template>
<DSLayout pageName="GraphCMS">

  <h1 class="page-title">GraphCMS</h1>
  <ul class="posts-container">
    <li class="single-post" v-for="(post, index) in $page.allGraphCMS.edges" :key="index">
      <div class="post-hero">
        <g-link class="post-link" :to="post.node.path">
          <div class="post-thumbnail-wrapper">
            <h2 class="post-title">{{ post.node.title }}</h2>
            <h3 class="post-subtitle">{{ post.node.subtitle }}</h3>
            <!-- <img class="post-thumbnail" :src="post.node.imageUrl" /> -->
          </div>
        </g-link>
        <g-link class="post-link" :to="post.node.path">
          <div class="post-body-wrapper">
            <p class="post-date">Published: {{ formatDate(post.node.datePublished) }}</p>
            <p class="post-body">{{ post.node.body }}</p>
            <div class="read-more">
              <p class="read-more-text">Read More</p>
            </div>
          </div>
        </g-link>
      </div>
    </li>
  </ul>

</DSLayout>
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
import moment from 'moment';
import DSLayout from '~/layouts/DSLayout.vue';
import DSSideBar from '~/components/DSSideBar.vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';

export default {
  components: {
    DSLayout,
    DSSideBar,
    Breadcrumbs
  },
    metaInfo() {
    return {
      title: 'DOTA.vue', // this.$route.name,
      titleTemplate: '%s | DOTA2 Heroes',
      breadCrumb: this.$route.name
    }
  },
  data: function () {
    return {
      date: moment(),
      formatedDate: ''
    }
  },
  methods: {
    formatDate(x) {
      console.log(`moment date: ${moment(x).format('MMMM Do, YYYY')}`)
      return moment(x).format('MMMM Do, YYYY');
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";

.content {
  grid-area: main-content;
}

#breadcrumbs {
  grid-area: breadcrumbs;
}

.site-container {
  background: #252525;
  height: calc(100vh - 70px);
}

.page-title {
  line-height: 1.5em;
  border-bottom: 3px solid $primary-blue;
  margin-bottom: 1em;
  color: white;
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
  color: rgba(white, 0.5);
  border-left: 3px solid rgba(0, 0, 0, 0);
  max-height: 30vh;
  overflow: hidden;
  transition: .25s all ease-in-out;

  .post-body,
  .post-title,
  .post-subtitle,
  .read-more,
  .read-more-text {
    transition: .25s all ease-in-out;
  }

  .post-body {
    color: rgba(white, 0.5);
  }

  .post-title,
  .post-subtitle {
    color: rgba(white, 0.75);
  }

  :hover {
    color: $primary-blue;
    transition: .25s all ease-in-out;

    .post-date {
      color: $primary-blue;
    }

    .post-title,
    .post-subtitle {
      color: white;
    }

    .post-hero {
      border-left: 3px solid $primary-blue;
    }

    .post-body {
      color: rgba(white, .75);
    }

    .read-more .read-more-text {
      opacity: 1;
    }

  }
}

.single-post a {
  color: white;
  font-weight: 300;
  line-height: 1.25em;
  margin-right: 1.5em;
  max-height: 30vh;
}

.post-body-wrapper {
  line-height: 1.2em;
  height: calc(1.75em + (1.2em * 8));
  overflow: hidden;
  position: relative;

  :after {
    content: "";
    text-align: center;
    position: absolute;
    bottom: 1.2em;
    right: 0;
    width: 100%;
    height: 2.4em;
    background: linear-gradient(to bottom, rgba(#252525, 0) 0%, rgba(#252525, .25) 80%, rgba(#252525, .45));
    pointer-events: none;
  }
}

.read-more {
  position: absolute;
  background: linear-gradient(to bottom, rgba(#252525, .8), rgba(#252525, 1) 80%);
  bottom: 0;
  right: 0;
  width: 100%;
  text-align: center;
  color: $primary-blue;
  height: 1.2em;
  display: flex;
  justify-items: center;
  justify-content: center;

  .read-more-text {
    width: auto;
    text-align: center;
    // background: #252525;
    padding: 0 1em;
    opacity: 0;
    font-size: .9em;
    border-bottom: 1px dotted $primary-blue;
  }
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
  border-bottom: 1px solid rgba($primary-white, .5);
  transition: .25s all ease-in-out;
  // background: rgba($primary-blue, 0.25);
}

.post-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1em;
}

.post-title {
  color: white;
  text-transform: capitalize;
  font-size: 2em;
}

.post-subtitle {
  line-height: 1.5em;
  margin: 0;
  padding: 0 0 1em 0;
}

.post-thumbnail-wrapper {
  max-height: 30vh;
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
