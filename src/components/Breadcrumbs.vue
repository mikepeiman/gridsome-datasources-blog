<template>
<div id="breadcrumbs" v-on="listeners">

  <div v-for="crumb in setBreadcrumbs" :name="crumb.name" class="breadcrumb">
    <h4>
      <a :href="crumb.path">{{ crumb.name }}</a>
    </h4>
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
var changeCase = require('change-case')

export default {
  name: 'Breadcrumbs',
  data: function () {
    return {
      linkSet: [],
      activeLink: '',
      crumb: 'test',
      counter: '',
    }
  },
  props: ['pageName'],
  metaInfo() {
    return {
      title: this.pageTitle,
      breadCrumb: this.$route.name,
      hero: this.$route.params.hero,
      ability: this.$route.params.name,
      i: 0
    }
  },
  computed: {
    listeners() {
      const { ...listeners
      } = this.$listeners
      console.log(`listeners in Breadcrumbs.vue: ${this.$listeners}`)
      console.log(this.$listeners)
      return listeners
    },
    setBreadcrumbs() {
      console.log('set breadcrumbs')
      let path = this.$route.path
      console.log(path)
      path = path.split("/").splice(1, path.length)
      this.counter = path.length
      console.log(`path: ${path}, path length: ${path.length}`)
      let newArray = []
      let breadcrumbPaths = []
      let pathLength = path.length
      for (let i = 0; i < pathLength; i++) {
        console.log(`i in path.length: ${i}: ${path[i]}`)
        breadcrumbPaths.push({
          'path': '/' + path.slice(0, i + 1).join('/').replace(/_/g,"-"),
          'name': path[i],
          'num': i + 1
        })
      }
      this.breadcrumbs = breadcrumbPaths
      return breadcrumbPaths
    },
    path(i) {
      let path = this.$route.path.split("/").splice(1, path.length)
      this.counter = path.length
      path = path[i]
      console.log(`path: ${path}`)
      return path
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
    },
  },
  methods: {
    checkActiveClass(crumbPath) {
      console.log(`this is the href of this breadcrumb: ${crumbPath}`)
      let path = this.$route.path
      if (path !== crumbPath) {
        console.log(`no match! `)

      }
      console.log(` This is this:`)
      console.log(this.$el)
    }
  },
  mounted() {
    // remove active class from breadcrumbs

    let crumbs = this.$el.children
    let path = this.$route.path
    for(let i = 0; i < crumbs.length; i++) {
      // console.log(crumbs[i])
      let child = crumbs[i].childNodes[0].firstChild
      let href = child.attributes.href.nodeValue
      // console.log(`child.className: ${child.className}`)
      // console.log(`child.attributes.href:`)
      // console.log(child.attributes.href.nodeValue)
      if(href !== path) {
        child.className = ""
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";

#breadcrumbs {
  grid-area: breadcrumbs;
  color: grey;
  display: flex;

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

  :first-child {
    margin-left: 0;
  }
}

.breadcrumb {
  margin-left: 0.5em;

  h4:after {
    content: ">";
    margin-left: 0.5em;
  }
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
