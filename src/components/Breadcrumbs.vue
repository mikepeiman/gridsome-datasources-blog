<template>
<div id="breadcrumbs">
  <!-- <g-link class="nav__link" :to="{ name: 'dataSources' }"> -->
  <h4>
    <g-link :to="{ name: 'dota' }">Heroes > </g-link>
    <g-link :to="`/heroes/${hero}`">{{ hero.charAt(0).toUpperCase() + hero.slice(1) }}</g-link>
    <span v-if="isAbilityPage">
      >
      <g-link  :to="ability">{{ abilityTitle }}</g-link>
    </span>
  </h4>
  <!-- </g-link> -->
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
var changeCase = require('change-case')

export default {
  name: 'Breadcrumbs',
  data: function () {
    return {
      linkSet: [],
      activeLink: '',
      isAbilityPage: '',
      abilityTitle: '',
    }
  },
  props: ['pageName'],
  metaInfo() {
    return {
      title: this.pageTitle,
      breadCrumb: this.$route.name,
      hero: this.$route.params.hero,
      ability: this.$route.params.name,

    }
  },
  computed: {
    hero() {
      // return this.$route.params.hero
      let name = this.$route.name
      console.log(`computed hero(): ${name}`)
      return (name == 'heroes' ? this.$route.params.name : this.$route.params.hero)
      // return (name == 'heroes' ? false : true)
    },
    ability() {
      let name = this.$route.params.name
      console.log(`computed hero(): ${name}`)
      this.abilityTitle = changeCase.title(name)
      return name
    },
    pageTitle() {
      let route = changeCase.title(this.$route.name)
      let name = changeCase.title(this.$route.params.name)
      let hero = changeCase.title(this.$route.params.hero)
      let heroRoute = route + " > " + name
      let abilityRoute = hero + " > " + route + " > " + name
      if (route == 'Abilities') {
        return abilityRoute
      } else if (route == 'Heroes') {
        return heroRoute
      } else {
        return route
      }
    }
  },
  created() {
    let name = this.$route.name
    console.log(`${name} == 'heroes': ${name == 'heroes'}`)
    console.log(`breadcrumbs component created() $route:`)
    console.log(this.$route)
    return (name == 'heroes' ? this.isAbilityPage = false : this.isAbilityPage = true)

  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";

#breadcrumbs {
  grid-area: breadcrumbs;
  color: grey;

  a {
    text-decoration: none;
    color: grey;

    &:visited {
      color: grey;
    }

    &:hover {
      color: $primary-blue;
    }
  }
}

// .page-title {
//   position: relative;
//   left: 10%;
//   text-align: left;
//   border-bottom: 3px solid $primary-blue;
//   color: white;
// }

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
