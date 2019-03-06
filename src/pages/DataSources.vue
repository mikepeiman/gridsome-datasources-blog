<template>
<Layout>
  <h1>Data Sources</h1>
    <ul class="page-link-listing">
      <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'fakerPosts' }">Faker</g-link></li>
      <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'placeholder' }">Placeholder</g-link></li>
      <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'starwars' }">StarWars</g-link></li>
      <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'dota' }">DOTA2</g-link></li>
      <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'filesystem' }">Filesystem</g-link></li>
      <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'airDb' }">Airtable</g-link></li>
      <li class="nav-link-container"><g-link class="nav__link" :to="{ name: 'graph' }">GraphCMS</g-link></li>
    </ul>
</Layout>
</template>

<script>
export default {
  // ..
}
</script>

<style scoped>
.page-link-listing li {
  background: rgba(20,50,200,0.25);
  padding: 1ch;
  border-left: 3px solid darkblue;
  border-bottom: 3px solid rgba(0,0,0,0);
}
.page-link-listing li:hover {
  background: rgba(20,50,200,0.75);
  padding: 1ch;
  color: white;
  border-left: 3px solid darkorange;
  border-bottom: 3px solid darkorange;
}

</style>
