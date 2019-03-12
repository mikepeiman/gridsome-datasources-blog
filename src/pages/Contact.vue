<template>
<Layout>
  <div id="contact-us-layout" class="site-container">
    <div class="content">
      <h1 class="page-title">Contact Us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione iste porro vero facere! Facere veniam at saepe, quam error deleniti officiis alias eum. Deleniti adipisci optio totam qui magnam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
    </div>
  </div>

</Layout>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
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


.content {
  grid-area: main-content;
}

.page-title {
  font-size: 4rem;
  text-shadow: 0 0 2px #252525;
}
</style>
