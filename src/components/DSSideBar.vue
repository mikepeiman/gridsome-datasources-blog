<template>
<div id="datasources-sidebar">
  <g-link class="nav__link" :to="{ name: 'dataSources' }">
    <h1 class="page-title">Data Sources</h1>
  </g-link>
  <div class="content">
    <ul class="page-link-listing">
      <li @click="mainLink(1)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'fakerPosts' }">Faker</g-link>
      </li>
      <li @click="mainLink(2)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'placeholder' }">Placeholder</g-link>
      </li>
      <li @click="mainLink(3)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'starwars' }">StarWars</g-link>
      </li>
      <li @click="mainLink(4)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'heroes' }">DOTA2 Heroes</g-link>
      </li>
      <li @click="mainLink(5)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'filesystem' }">Filesystem</g-link>
      </li>
      <li @click="mainLink(6)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'airDb' }">Airtable</g-link>
      </li>
      <li @click="mainLink(7)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'graph' }">GraphCMS</g-link>
      </li>
      <li @click="mainLink(8)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'strapiCms' }">StrapiCMS</g-link>
      </li>
    </ul>
  </div>
</div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {
  name: 'DSSideBar',
  data: function () {
    return {
      linkSet: [],
      activeLink: ''
    }
  },
  props: ['pageName'],
  methods: {
    mainLink(x) {
      let el = Object.values(this.$refs)[x].$el;
      let elClass = el.parentElement.parentElement.attributes.class.value
      let link = el.attributes.href.value
      this.linkSet.push(link)
      let i = this.linkSet.length;
      this.activeLink = link;
      console.log(`MAINLINK - Current activelink: ${this.activeLink}, current click: ${link}, linkSet: ${this.linkSet}`);
      if (this.linkSet.length !== 1) {
        this.$router.push(this.linkSet[0]);
      } else {
        this.$router.push(this.activeLink);
      }
      this.linkSet = []
    },
  }
}
</script>

<style lang="scss" scoped>
$primary-graphite: #252525; // rgba($primary-graphite,1)
$primary-blue: #00A1FF; // rgba($primary-blue,1)
$primary-orange:#FF7800; // rgba($primary-orange,1)
$primary-green: #67DD00; // rgba($primary-green,1)
$primary-purple: #4600CD; // rgba($primary-purple,1)

#datasources-sidebar {
  grid-area: sidenav;

  h1 {
    color: white;
  }
}

.page-title {
  position: relative;
  left: 10%;
  text-align: left;
  border-bottom: 3px solid $primary-blue;
}

li.nav-link-container {
  color: #fff;
  background: rgba($primary-blue, .25);
  display: block;
  float: left;
  padding: 1rem;
  position: relative;
  text-decoration: none;
  transition-duration: 0.25s;
  list-style: none;
  margin-bottom: 0;
  border-bottom: 3px solid rgba(0, 0, 0, 0);
  width: 16ch;
  height: 3ch;
  text-align: left;
}

.nav__link {
  text-decoration: none;
}

.nav-link-container {
  z-index: 10;
}

li.nav-link-container a {
  color: #fff;
  white-space: nowrap;
}

li.nav-link-container:hover,
li.nav-link-container:focus-within,
  {
  background: rgba($primary-green, 0.5);
  cursor: pointer;
  border-bottom: 1px solid $primary-green;
  /* width: 17ch; */
}

li#DataSources {
  background: rgba($primary-green, 0.25);
  cursor: pointer;
  border-bottom: 1px solid $primary-green;
  /* width: 17ch; */
}

li.nav-link-container:focus-within a {
  outline: none;
}

ul li ul {
  background: #252525;
  visibility: hidden;
  opacity: 0;
  /* min-width: 5rem; */
  position: absolute;
  transition: all 0.25s ease;
  margin-top: 1rem;
  left: 0;
  top: 43px;
  display: none;
  padding: 0;
  text-align: left;
}

ul li:hover>ul,
ul li:focus-within>ul,
ul li ul:hover,
ul li ul:focus {
  visibility: visible;
  opacity: 1;
  display: block;
}

.dropdown li {
  clear: both;
  width: 84%;
  text-align: left;
  padding: 8% 8% 8% 8%;
  transition: all .25s ease-in-out;
}

.dropdown li:hover {
  clear: both;
  width: 80%;
  // text-align: center;
  /* width: 12ch; */
  transition: all .25s ease-in-out;
  // transform: translateX(2em);
  padding: 8% 8% 8% 12%;

  a {
    // padding: 8% 8% 8% 12%;
    transition: all .25s ease-in-out;

    :visited {
      color: white;
    }
  }
}
</style>
