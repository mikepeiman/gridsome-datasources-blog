<template>
<div class="grid">
  <Header class="header" />
  <slot class="main" />
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
import Header from '~/components/Header.vue';

export default {
  components: {
    Header
  },
  data: function() {
    return {
      grid: ''
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Alfa+Slab+One|Fahkwang|Lustria|Maven+Pro|Montserrat|Questrial|Quicksand|Roboto|Sarabun|Source+Sans+Pro|Tajawal|Varela+Round|Volkhov');

body {
  font-family:
    /* roboto body, Montserrat/Quicksand headings, Sarabun sub-headings, Volkhov titles, possible use of Alfa Slab on headings. Keep Lustria and Maven Pro. */

    Quicksand,
    "Segoe UI",
    Roboto,
    Montserrat,
    -apple-system,
    system-ui,
    BlinkMacSystemFont,

    "Helvetica Neue",
    Arial,
    sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  background: black;
}

h1 {
  font-family:
    "Lustria",
    "Fahkwang",
    "Segoe UI",
    "Sarabun",
    "Maven Pro",
    "Lustria",
    "Alfa Slab One",
    "Volkhov",
    "Montserrat",
    "Source Sans Pro";
  font-weight: 700;
}

h2,
h3,
h4,
h5,
h6 {
  font-family:
    /* "Montserrat", */
    /* "Lustria",  */
    "Sarabun"
}

p {
  font-family: "Quicksand"
}

.bottom-line {
  font-weight: 700;
}

.grid {
  max-width: 100vw;
  display: grid;
  background: rgba(0,120,240,0.25);
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 100px auto;
  grid-template-areas: 
    "left header header header right"
    "left main main main right";
}

.nav__link {
  margin-left: 20px;
  text-decoration: none;
}

.site-title {
  text-decoration: none;
}
</style>
