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
      <g-link class="nav__link" :to="{ name: 'faker' }">Faker</g-link>
      <g-link class="nav__link" :to="{ name: 'blog' }">Blog</g-link>
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
    this.header = 'mounted header';
  },
}
</script>

<style scoped>

.header {
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
/* .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
} */

.nav__link {
  margin-left: 20px;
  text-decoration: none;
}

.site-title {
  text-decoration: none;
}
</style>
