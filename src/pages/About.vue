<template>
<Layout>
  <div id="about-us-layout" class="site-container">
    <div class="about-us-images">
      <div class="about-us-image"></div>
      <div class="about-us-image"></div>
      <div class="about-us-image"></div>
      <div class="about-us-image"></div>
      <!-- <img src="../assets/papers.co-mi90-life-begins-leaf-waterdrop-nature-3840x2400-4k-wallpaper.jpg" alt="Images of Mike Peiman and scenic shots"> -->
    </div>
    <div class="content">
      <h1 class="page-title">About Us</h1>
      <p id="textToCopy">Building a better world for all, through the power of transformational education, the development of virtuous character, and the unflagging pursuit of excellence.</p>
      <!-- <button @click="CopyText">Copy</button> -->
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati impedit totam voluptas quas repellendus modi, nam rem sequi tempora! Voluptate suscipit magnam aspernatur, et nesciunt dicta soluta. Fugit laboriosam harum laborum, ratione distinctio, omnis natus quo corporis vero inventore optio nulla debitis quasi consequatur accusamus eligendi reprehenderit accusantium quos rem quam, cum consectetur ad velit error. </p>
    </div>
  </div>

</Layout>
</template>

<script>
// import CopyText from './../assets/CopyOnClick.js'
export default {
  // methods: {
  //   copyOnClick(e) {
  //     {
  //       let t = document.querySelector('#textToCopy').innerText
  //       // var selObj = window.getSelection();
  //       // alert(selObj);
  //       navigator.clipboard.writeText(t).then(function () {
  //         console.log(`Async: Copying to clipboard was successful! Copied: ${t}`);
  //       }, function (err) {
  //         console.error('Async: Could not copy text: ', err);
  //       });
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
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

#about-us-layout {
  color: white;
  min-height: 100%;
  width: 100%;
}

.about-us-images {
  grid-area: cta;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: 1fr 1fr;
  grid-gap: 1ch;
  margin: 1.4em 0 1.25em 0;
}

.about-us-image {
  background-image: linear-gradient(rgba($primary-white, .25), rgba($primary-purple, 0.25)), url('./../assets/papers.co-mi90-life-begins-leaf-waterdrop-nature-3840x2400-4k-wallpaper.jpg');
  background-size: cover;
  background-position: center;
}

.content {
  grid-area: main-content;
  margin: 0 20vw 0 0;
}

.page-title {
  font-size: 4rem;
  margin: 0;
  text-shadow: 0 0 2px #252525;
}
</style>
