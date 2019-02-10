<template>
<div class="layout">
  <header class="header">
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
  <slot />
</div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

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

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
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
</style>
