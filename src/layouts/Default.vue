<template>
<div class="layout">
  <Header></Header>
  <slot />
</div>
</template>

<script>
import Header from '~/components/Header.vue';

export default {
  components: {
    Header
  }
}
</script>

<style>
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
  background: white;
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
    "Sarabun";
  line-height: 1em;
}

p {
  font-family: "Quicksand"
}

.bottom-line {
  font-weight: 700;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  background: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
  text-decoration: none;
}

.site-title {
  text-decoration: none;
}
li {
  list-style: none;
  margin-bottom: 2em;
  border-bottom: 3px solid #00ccff;
}
a {
  text-decoration: none;
  line-height: 1em;
}
</style>
