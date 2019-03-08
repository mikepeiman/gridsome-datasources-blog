<template>
  <div>
      <header :class="header">
    <strong>
        <g-link class="site-title" :to="{ name: 'home' }">{{ $static.metaData.siteName }}</g-link>
      </strong>
    <nav class="nav">
      <g-link class="nav__link" :to="{ name: 'home' }">Home</g-link>
      <g-link class="nav__link" :to="{ name: 'about' }">About</g-link>
      <g-link class="nav__link" :to="{ name: 'contact' }">Contact</g-link>
      <li><g-link class="nav__link" :to="{ name: 'fakerPosts' }">Faker</g-link></li>
      <li><g-link class="nav__link" :to="{ name: 'placeholder' }">Placeholder</g-link></li>
      <li><g-link class="nav__link" :to="{ name: 'starwars' }">StarWars</g-link></li>
      <li><g-link class="nav__link" :to="{ name: 'dota' }">DOTA2</g-link></li>
      <li><g-link class="nav__link" :to="{ name: 'filesystem' }">Filesystem</g-link></li>
      <li><g-link class="nav__link" :to="{ name: 'airDb' }">Airtable</g-link></li>
      <li><g-link class="nav__link" :to="{ name: 'graph' }">GraphCMS</g-link></li>
<!-- <g-link class="nav__link" :to="{ name: 'datasources' }">Data Sources</g-link> -->
      <!-- <a class="nav__link" id="dropdownTest" href="#" @click="dropdownTest">Test Dropdown</a> -->
    </nav>
  </header>
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
  name: 'Header',
  data: function() {
    return {
      header: ''
    }
  },
  mounted() {
    this#header = 'mounted header';
  },
  methods: {
    dropdownTest() {
      console.log('dropdown test')
    }
  }
}
</script>

<style scoped>
.nav {
  z-index: 100;
}
#header {
  /* max-width: 760px; */
  justify-self: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  /* height: 80px; */
  grid-area: header;
  margin: 0.5em 2em;
  width: 100%;
}
/* #header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
} */

.nav__link {
  margin-left: 5px;
  text-decoration: none;
  color: black;
  border: 1px solid white;
  background: #00ccff;
  padding: 5px;
  /* z-index: 100; */
}
.nav__link:visited {
  color: black;
}
a:visited {
  color: black;
}
a:hover {
  color: red;
}
:visited {
  color: blue;
}

.site-title {
  text-decoration: none;
}
</style>
