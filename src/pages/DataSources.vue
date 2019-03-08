<template>
<Layout>
  <div id="datasources-layout" class="site-container">
    <div class="content">
      <h1 class="page-title">Data Sources:</h1>
      <ul class="page-link-listing">
        <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'fakerPosts' }">Faker</g-link></li>
        <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'placeholder' }">Placeholder</g-link></li>
        <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'starwars' }">StarWars</g-link></li>
        <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'dota' }">DOTA2</g-link></li>
        <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'filesystem' }">Filesystem</g-link></li>
        <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'airDb' }">Airtable</g-link></li>
        <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'graph' }">GraphCMS</g-link></li>
      </ul>
    </div>
  </div>
</Layout>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
$primary-graphite: #252525;
$primary-blue: #00A1FF;
$primary-orange:#FF7800;
$primary-green: #67DD00;
$primary-purple: #4600CD;

.site-container {
  background: #252525;
  background-size: cover;
  background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-blue, 0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 1fr 2fr 2em 8fr;
  grid-template-areas: ". . . ."". cta . main-content";
  grid-template-rows: minmax(184px, 1fr) auto 1fr;
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
  border-bottom: 3px solid rgba(0,0,0,0);
  width: 50%;
}
#datasources-layout .page-link-listing {
  a {
    text-transform: uppercase;
  }
  a:visited {
    color: #efefef;
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
