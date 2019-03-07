<template>
<Layout>
  <div id="about-us-layout">
    <div class="content">
      <h1 class="page-title">About Us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione iste porro vero facere! Facere veniam at saepe, quam error deleniti officiis alias eum. Deleniti adipisci optio totam qui magnam!</p>
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

#about-us-layout {
  background: none;
  color: white;
  min-height: 72vh;
  background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-purple, 0.25)), url("D:/Stock-Photos/pexels-photo-206622.jpeg");
  /* rgba(255,120,0, 0.25) */
  background-position: center;
  background-size: cover;
  min-height: 92vh;
  top: 61px;
  position: absolute;
}

.content {
    margin: 20vh 5vw 0 28vw;
}

.page-title {
  color: #white;
  font-size: 4rem;
  text-shadow: 0 0 2px #252525;
}
</style>
