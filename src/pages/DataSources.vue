<template>
<Layout>
  <div id="datasources-layout">
    <div class="content">
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

#datasources-layout {
  background: none;
  color: white;
  min-height: 72vh;
  background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-purple, 0.25)), url('./../assets/papers.co-vd81-scifi-web-by-emilwidlund-pattern-abstract-art-3840x2400-4k-wallpaper.jpg');
  background-position: center;
  background-size: cover;
  min-height: 92vh;
  top: 61px;
  position: absolute;
  width: 100%;
}

.content {
    margin: 20vh 5vw 0 28vw;
}

.page-title {
  color: white;
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
