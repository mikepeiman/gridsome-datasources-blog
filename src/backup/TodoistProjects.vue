<template>
<DSLayout :pageName="pageName">

  <h1 class="page-title">DOTA2 Heroes</h1>
  <div class="grid-main">
    <ul class="hero-list" v-for="(item, index) in $page.allTodoistTasks.edges" :key="item.id">
      <g-link :to="item.node.path">
        <li class="item-container grid-item">
          <div class="hero-number">{{ item.node.id }}</div>
          <div class="hero-number-bg">
            <h2 class="hero-name">{{ item.node.content }}</h2>
          </div>
          <img class="hero-image" :Src="item.node.heroImgSrc" />
          <div class="abilities-list" v-for="label in item.node.labels">
            <p class="single-ability">{{ label.name }}</p>
          </div>
        </li>
      </g-link>
    </ul>
  </div>

</DSLayout>
</template>

<page-query>
{
  allTodoistTasks {
    edges {
      node {
        id
        project
        content
		labels {
      id
      name
      path
    }
				comments {
          id
          content
        }
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
  },
  data: function () {
    return {
      pageName: 'DOTA2 Heroes'
    }
  },
  created() {
    this.$emit(this.pageName)
  },
  metaInfo() {
    return {
      title: 'DOTA.vue', // this.$route.name,
      titleTemplate: '%s | DOTA2 Heroes',
      breadCrumb: this.$route.name
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";

.site-container {
  background: #252525;
  height: calc(100vh - 70px);
  grid-template-columns: 1fr 1fr 5fr 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
    ". . . ."
    "sidenav . main-content .";
}

.page-title {
  line-height: 1.5em;
  border-bottom: 3px solid $primary-blue;
  // margin-bottom: -1em;
}

.content {
  grid-area: main-content;
  color: white;
}

.grid-main {
  // max-width: 84vw;
  // margin-right: 8vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-template-rows: auto;
  grid-gap: 5px;
  line-height: 1em;

  ul li {
    padding: 0;
  }
}

.main {
  grid-area: main;
  min-height: 100vh;
}

.grid-item {
  text-align: center;
  padding: 0;
  margin: 0 0 1em 0;
}

.hero-list {
  padding: 0;
  margin: 0;
}

.hero-image {
  width: 50px;
  min-width: 50px;
  max-width: 100px;
  width: 100%;
  padding: 0;
  margin: 0;
  // justify-self: left;
}

.hero-number {
  font-size: .5em;
  font-weight: 300;
  margin: 0;
  padding: 0 0 5px 0;
  position: relative;
  top: 21px;
  left: 5px;
  height: 10px;
  width: 18px;
  border: 1px solid rgba($primary-blue, 0.5);
  background: $primary-graphite;
  z-index: 2;
  color: rgba($primary-white, .5);
}

.hero-number-bg {
  font-size: .5em;
  font-weight: 300;
  margin: 0;
  padding: 0px 3px;
  position: relative;
  background: $primary-graphite;
  min-width: calc(50px-.4em);
  width: calc(100% -5px);
  height: 30px;
  border: 1px solid black;
  left: 0px;
  z-index: 1;
}

.hero-name {
  font-size: 1.4em;
  padding: 0 0 .5em 0;
  margin: 3px 0 0 26px;
  line-height: 1em;
  color: $primary-white;
  z-index: 10;
  font-weight: 400;
  font-family: "Source Sans Pro", 'Montserrat';
  text-align: left;
}

.hero-image {
  border-bottom: 1px solid $secondary-blue;
}

.single-ability {
  font-size: 0.5em;
  text-align: left;
  line-height: 1em;
  color: $primary-blue;
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
