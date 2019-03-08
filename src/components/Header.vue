<template>
<header id="header">
  <g-link id="site-logo" class="site-title" :to="{ name: 'home' }">
    <g-image alt="logo" src="../assets/LifeIQ.svg" width="60" />
  </g-link>
  <div id="nav-filler">
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
    <div class="nav-filler-bar"></div>
  </div>
  <nav id="topnav" role="navigation">
    <ul class="nav-items">
      <li @click="mainLink(2)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'home' }">Home</g-link>
      </li>
      <li @click="mainLink(3)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'about' }">About</g-link>
      </li>
      <li @click="mainLink(4)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'dataSources' }">Data Sources</g-link>
        <ul class="dropdown" aria-label="submenu">
          <li @click="subLink(5)" class="nav-link-container">
            <g-link class="nav__link" :to="{ name: 'fakerPosts' }">Faker</g-link>
          </li>
          <li @click="subLink(6)" class="nav-link-container">
            <g-link class="nav__link" :to="{ name: 'placeholder' }">Placeholder</g-link>
          </li>
          <li @click="subLink(7)" class="nav-link-container">
            <g-link class="nav__link" :to="{ name: 'starwars' }">StarWars</g-link>
          </li>
          <li @click="subLink(8)" class="nav-link-container">
            <g-link class="nav__link" :to="{ name: 'dota' }">DOTA2</g-link>
          </li>
          <li @click="subLink(9)" class="nav-link-container">
            <g-link class="nav__link" :to="{ name: 'filesystem' }">Filesystem</g-link>
          </li>
          <li @click="subLink(10)" class="nav-link-container">
            <g-link class="nav__link" :to="{ name: 'airDb' }">Airtable</g-link>
          </li>
          <li @click="subLink(11)" class="nav-link-container">
            <g-link class="nav__link" :to="{ name: 'graph' }">GraphCMS</g-link>
          </li>
        </ul>
      </li>
      <li @click="mainLink(12)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'contact' }">Contact</g-link>
      </li>
    </ul>
  </nav>
</header>
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
  name: 'Header',
  data: function () {
    return {
      activeLink: '',
      lastActiveLink: '',
      submenuActive: false,
      linkSet: []
    }
  },
  methods: {
    dropdownTest() {
      console.log('dropdown test')
    },
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
    subLink(x) {

      let el = Object.values(this.$refs)[x].$el;
      let elClass = el.parentElement.parentElement.attributes.class.value
      let link = el.attributes.href.value
      this.linkSet.push(link)
      let i = this.linkSet.length;
      this.activeLink = link;
      console.log(`subLINK - Current activelink: ${this.activeLink}, current click: ${link}, linkSet: ${this.linkSet}`);
      this.$router.push(this.activeLink);

    }
  },
  computed: {

  },
}
</script>

<style lang="scss" scoped>
$primary-graphite: #252525; // rgba($primary-graphite,1)
$primary-blue: #00A1FF; // rgba($primary-blue,1)
$primary-orange:#FF7800; // rgba($primary-orange,1)
$primary-green: #67DD00; // rgba($primary-green,1)
$primary-purple: #4600CD; // rgba($primary-purple,1)

#header {
  display: grid;
  grid-template-columns: 1fr 2fr 2em 8fr;
  grid-template-areas: "logo nav-filler . topnav";
  justify-content: center;
  padding: 0;
  margin: 0;
  position: fixed;
  width: 100%;
  // border-left: 3px solid blue;
  // height: 70px;
}

a {
  text-decoration: none;
}

#site-logo {
  // position: absolute;
  justify-self: center;
  padding-top: 5px;
  // top: 6px;
}

#nav-filler {
  // border-left: 3px solid $primary-orange;
  // border-right: 3px solid $primary-purple;
  margin: 0 1em;
  grid-area: nav-filler;
  display: grid;
  grid-template-columns: repeat(12,1fr)
}
.nav-filler-bar {
  background: $primary-green;
}

/************************
nth-child mixin
************************/

// $max-count is the maximum amount of colors you'll want
// $color-frequency is how intense you want the color change to be. Lower # = more intense changes
@mixin colors($max-count, $color-frequency){
  $color: 460/$max-count;
  
  @for $i from 1 through $max-count {
    &:nth-child(#{$max-count}n + #{$i}) {
      // Modify 's' and 'l' percentages to match color scheme you want
      background: hsla(($i - 1)*($color / $color-frequency), 80%, 20%, 50%);
    }
  }
}
/************************
nth-child mixin
********/

#nav-filler > .nav-filler-bar {
  @include colors(12,3);
}

nav {
  font-family: monospace;
  font-size: .9rem;
  padding-top: 5px;
  // border-bottom: 3px solid $primary-blue;
  // width: 760px;
}
.nav-items:first-child {
      // border-left: 3px solid $primary-blue;
    }
ul {
  /* background: darkorange; */
  list-style: none;
  margin: 0;
}

.nav-items {
  display: flex;
  padding-left: 0.5rem;
  /* border-bottom: 3px solid #00ccff; */
}

.dropdown {
  width: 100%;
}

li.nav-link-container {
  color: #fff;
  /* background: darkorange; */
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
  text-align: center;
}

li.nav-link-container a {
  color: #fff;
  white-space: nowrap;
}

li.nav-link-container:hover,
li.nav-link-container:focus-within {
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
  }
}
</style>
