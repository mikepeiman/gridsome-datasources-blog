<template>
<Layout>
  <div id="homepage-layout">
    <div class="content">
      <h1 class="page-title">Curriculum For Life</h1>
      <h2>It didn't come with an instruction manual, did it?</h2>
      <p>Fortunately, you don't have to go it alone. We exist in relationship, and we learn from each other. The wisest of us have passed along their learnings over thousands of years. Today, we can discover, collect, synthesize and integrate the wisdom of the ages and the best of modern science to guide us to a better way of life.</p>
      <p class="bottom-line">Join us on the journey of a lifetime - to radically heightened self-awareness and the development of human potential.</p>
    </div>
  </div>
</Layout>
</template>

<script>
export default {
  // ..
}
</script>

<style scoped lang="scss">
$primary-graphite: #252525;
$primary-blue: #00A1FF;
$primary-orange:#FF7800;
$primary-green: #67DD00;
$primary-purple: #4600CD;

/* .body-style {
  background: #252525;
  background-size: cover;
  background-image: linear-gradient(rgba(37,37,37,1), rgba(0,161,255,0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
} */
#homepage-layout {
  background: none;
  color: white;
  min-height: 72vh;
  background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-purple, 0.25)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
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
  font-size: 4rem;
  text-shadow: 0 0 2px #252525;
}
</style>
