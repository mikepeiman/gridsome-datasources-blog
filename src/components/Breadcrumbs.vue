<template>
<div id="breadcrumbs">
  <!-- <g-link class="nav__link" :to="{ name: 'dataSources' }"> -->
    <h1 class="page-title">Breadcrumbs</h1>
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
export default {
  name: 'Breadcrumbs',
  data: function () {
    return {
      linkSet: [],
      activeLink: ''
    }
  },
  props: ['pageName'],
}
</script>

<style lang="scss" scoped>
$primary-graphite: #252525; // rgba($primary-graphite,1)
$primary-blue: #00A1FF; // rgba($primary-blue,1)
$primary-orange:#FF7800; // rgba($primary-orange,1)
$primary-green: #67DD00; // rgba($primary-green,1)
$primary-purple: #4600CD; // rgba($primary-purple,1)

#breadcrumbs {
  grid-area: breadcrumbs;
  // position: absolute;
  h1 {
    color: white;
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
