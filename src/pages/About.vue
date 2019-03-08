<template>
<Layout>
  <div id="about-us-layout" class="site-container">
    <div class="content">
      <h1 class="page-title">About Us</h1>
      <p id="textToCopy">Building a better world for all, through the power of transformational education, the development of virtuous character, and the unflagging pursuit of excellence.</p>
      <button @click="copyOnClick">Copy</button>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati impedit totam voluptas quas repellendus modi, nam rem sequi tempora! Voluptate suscipit magnam aspernatur, et nesciunt dicta soluta. Fugit laboriosam harum laborum, ratione distinctio, omnis natus quo corporis vero inventore optio nulla debitis quasi consequatur accusamus eligendi reprehenderit accusantium quos rem quam, cum consectetur ad velit error. Quaerat repellat quos rerum eligendi aspernatur facilis magni asperiores in vel atque at nobis sunt quae sed, voluptate, quibusdam quo reiciendis consectetur necessitatibus sapiente officiis temporibus. Obcaecati libero magni officiis quaerat aut quod soluta, maiores ad asperiores rem sit commodi quo. Atque excepturi possimus sequi numquam aperiam minima commodi consectetur eius ut voluptates in consequatur repudiandae ea cum sint delectus quasi rem non corrupti error provident, modi quo.</p>
    </div>
  </div>

</Layout>
</template>

<script>
export default {
  methods: {
    copyOnClick(e) {
      {
        let t = document.querySelector('#textToCopy').innerText
        // var selObj = window.getSelection();
        // alert(selObj);
        navigator.clipboard.writeText(t).then(function () {
          console.log(`Async: Copying to clipboard was successful! Copied: ${t}`);
        }, function (err) {
          console.error('Async: Could not copy text: ', err);
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-graphite: #252525;
$primary-blue: #00A1FF;
$primary-orange:#FF7800;
$primary-green: #67DD00;
$primary-purple: #4600CD;

.site-container {
  background: #252525;
  background-size: cover;
  background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-blue, 0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  height: calc(100vh - 70px);
  display: grid;
  grid-template-columns: 1fr 2fr 2em 8fr;
  grid-template-areas: ". . . ."". cta . main-content";
  grid-template-rows: minmax(184px, 1fr) auto 1fr;
}

#about-us-layout {
  color: white;
  min-height: 100%;
  width: 100%;
}

.content {
  grid-area: main-content;
}

.page-title {
  font-size: 4rem;
  margin: 0;
  text-shadow: 0 0 2px #252525;
}
</style>
