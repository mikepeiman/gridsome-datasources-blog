<template>
<header id="header">
  <g-link id="site-logo" class="page-title" :to="{ name: 'home' }">
    <g-image alt="logo" src="../assets/LifeIQ.svg" width="60" />
  </g-link>
  <nav id="topnav" role="navigation">
    <ul class="nav-items">
      <li @click="mainLink(2)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'home' }">Home</g-link>
      </li>
      <li @click="mainLink(3)" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'about' }">About</g-link>
      </li>
      <li @click="mainLink(4)" id="DataSources" class="nav-link-container">
        <g-link class="nav__link" :to="{ name: 'dataSources' }" focus>Data Sources</g-link>
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
  name: 'DSHeader',
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
@import "./../assets/colors.scss";

#header {
  display: grid;
  grid-template-columns: 1fr 2fr 2em 8fr;
  grid-template-areas: "logo nav-filler . topnav";
  justify-content: center;
  padding: 0;
  margin: 0;
  position: fixed;
  width: 100%;
}

a {
  text-decoration: none;
}

#site-logo {
  justify-self: center;
  padding-top: 5px;
}

#nav-filler {
  margin: 0 1em;
  grid-area: nav-filler;
  display: grid;
  grid-template-columns: repeat(12, 1fr)
}

.nav-filler-bar {
  background: $primary-green;
}

// /************************
// nth-child mixin
// ************************/

// // $max-count is the maximum amount of colors you'll want
// // $color-frequency is how intense you want the color change to be. Lower # = more intense changes
// @mixin colors($max-count, $color-frequency){
//   $color: 460/$max-count;

//   @for $i from 1 through $max-count {
//     &:nth-child(#{$max-count}n + #{$i}) {
//       // Modify 's' and 'l' percentages to match color scheme you want
//       background: hsla(($i - 1)*($color / $color-frequency), 80%, 20%, 50%);
//     }
//   }
// }

// #nav-filler > .nav-filler-bar {
//   @include colors(12,3);
// }

// /************************
// nth-child mixin
// ********/

nav {
  font-family: monospace;
  font-size: .9rem;
  padding-top: 5px;
}

ul {
  list-style: none;
  margin: 0;
}

.nav-items {
  display: flex;
  padding-left: 0.5rem;
}

.dropdown {
  width: 100%;
}

li.nav-link-container {
  color: #fff;
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
  background: rgba($primary-green, 0.25);
  cursor: pointer;
  border-bottom: 1px solid $primary-green;
}

li#DataSources {
  background: rgba($primary-orange, 0.25);
  cursor: pointer;
  border-bottom: 1px solid $primary-orange;
}

li.nav-link-container:focus-within a {
  outline: none;
}

ul li ul {
  background: #252525;
  visibility: hidden;
  opacity: 0;
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
  transition: all .25s ease-in-out;
  padding: 8% 8% 8% 12%;

  a {
    transition: all .25s ease-in-out;
  }
}
</style>
