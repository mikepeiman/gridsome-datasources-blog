<template>
<Layout>
  <div id="datasources-layout" class="site-container">
    <div class="content">
      <h1 class="page-title">Data Sources:</h1>
      <ul class="page-link-listing">
        <li @click="mainLink" class="nav-link-container">
          <g-link class="nav__link" :to="{ name: 'fakerPosts' }">Faker</g-link>
        </li>
        <li class="nav-link-container">
          <g-link class="nav__link" :to="{ name: 'placeholder' }">Placeholder</g-link>
        </li>
        <li class="nav-link-container">
          <g-link class="nav__link" :to="{ name: 'starwars' }">StarWars</g-link>
        </li>
        <li class="nav-link-container">
          <g-link class="nav__link" :to="{ name: 'dota' }">DOTA2</g-link>
        </li>
        <li class="nav-link-container">
          <g-link class="nav__link" :to="{ name: 'filesystem' }">Filesystem</g-link>
        </li>
        <li class="nav-link-container">
          <g-link class="nav__link" :to="{ name: 'airDb' }">Airtable</g-link>
        </li>
        <li class="nav-link-container">
          <g-link class="nav__link" :to="{ name: 'graph' }">GraphCMS</g-link>
        </li>
      </ul>
    </div>
  </div>
</Layout>
</template>

<script>
export default {
  methods: {
    mainLink(x) {
      // let el = Object.values(this.$refs)[x].$el;
      
      let link = x.currentTarget.children[0].attributes.href.value;
      console.log(`x event: ${link}`);
      
      // console.log(`Object.values: ${Object.values}`)
      // let elClass = el.parentElement.parentElement.attributes.class.value
      // let link = el.attributes.href.value
      // this.linkSet.push(link)
      // let i = this.linkSet.length;
      // this.activeLink = link;
      // console.log(`MAINLINK - Current activelink: ${this.activeLink}, current click: ${link}, linkSet: ${this.linkSet}`);
      this.$router.push(link);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";

.site-container {
  background: #252525;
  background-size: cover;
  background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-blue, 0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 1fr 2fr 2em 6fr 2fr;
  grid-template-areas: ". . . ."". cta . main-content";
  grid-template-rows: minmax(100px, 1fr) 5fr 1fr;
}

#contact-us-layout {
  color: white;
  min-height: 100%;
  width: 100%;
}

.content {
  grid-area: main-content;
  color: white;
}

.page-title {
  margin: 0;
  font-size: 4rem;
  text-shadow: 0 0 2px #252525;
}

#datasources-layout .page-link-listing li {
  padding: 0.5em;
  margin-bottom: .5em;
  border-bottom: 3px solid rgba(0, 0, 0, 0);
  width: 50%;
  background: rgba($primary-graphite, .75);
}

#datasources-layout .page-link-listing {
  a {
    text-transform: uppercase;
  }

  a:visited {
    color: $primary-white;
  }

  li:hover {
    color: $primary-green;
    background: #252525;
    background: rgba(white, 0.15);
  }
}

.page-link-listing li a {
  color: white;
}
</style>
