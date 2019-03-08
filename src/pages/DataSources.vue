<template>
<Layout>
  <div id="datasources-layout" class="site-container">
    <div class="content">
      <h1>Data Sources:</h1>
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
  max-height: 100vh;
  background-size: cover;
  background-image: linear-gradient(rgba(37,37,37,1), rgba(0,161,255,0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  // height: 100%;
}

#contact-us-layout {
  // background: none;
  color: white;
  min-height: 100%;
  // background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-purple, 0.25)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  background-size: cover;
  // min-height: calc(92vh - 3px);
  top: 58px;
  // position: absolute;
  width: 100%;
}

.content {
  // padding: 20vh 5vw 10% 28vw;
  grid-area: main-content;
  color: white;
}

.page-title {
  font-size: 4rem;
  text-shadow: 0 0 2px #252525;
}

#datasources-layout .page-link-listing li {
  
  padding: 1ch;
  margin-bottom: 1ch;
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
