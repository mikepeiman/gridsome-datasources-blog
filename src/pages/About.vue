<template>
<Layout>
  <div id="about-us-layout" class="site-container">
    <div class="content">
      <h1 class="page-title">About Us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione iste porro vero facere! Facere veniam at saepe, quam error deleniti officiis alias eum. Deleniti adipisci optio totam qui magnam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati impedit totam voluptas quas repellendus modi, nam rem sequi tempora! Voluptate suscipit magnam aspernatur, et nesciunt dicta soluta. Fugit laboriosam harum laborum, ratione distinctio, omnis natus quo corporis vero inventore optio nulla debitis quasi consequatur accusamus eligendi reprehenderit accusantium quos rem quam, cum consectetur ad velit error. Quaerat repellat quos rerum eligendi aspernatur facilis magni asperiores in vel atque at nobis sunt quae sed, voluptate, quibusdam quo reiciendis consectetur necessitatibus sapiente officiis temporibus. Obcaecati libero magni officiis quaerat aut quod soluta, maiores ad asperiores rem sit commodi quo. Atque excepturi possimus sequi numquam aperiam minima commodi consectetur eius ut voluptates in consequatur repudiandae ea cum sint delectus quasi rem non corrupti error provident, modi quo. Obcaecati corporis deserunt ipsum earum consectetur. Labore praesentium magnam nulla vitae nostrum facilis velit, minima dignissimos ad quia, distinctio sed ipsum? Ad, deserunt sint natus, accusamus, explicabo dolore et porro eius labore culpa perferendis aut fuga odio atque eos voluptatem minima numquam tenetur. Cupiditate, tenetur error necessitatibus deleniti maxime, rerum dicta in perspiciatis odio dolores aut! Harum ratione aliquid placeat enim labore facilis sapiente non nihil, tenetur mollitia soluta laudantium doloribus corrupti! Obcaecati sequi necessitatibus commodi, magnam animi repudiandae? Ipsam soluta adipisci, dolorum repellat quibusdam laborum temporibus. Recusandae eius nostrum eum illum tenetur voluptate optio quod voluptatum maiores iusto quisquam corrupti rerum, necessitatibus iure animi facilis sapiente quam asperiores illo vero sequi ratione. Ipsa dignissimos est reiciendis maxime facere obcaecati quibusdam adipisci? Nam excepturi assumenda facere dolor ipsum quis nemo, omnis quod exercitationem id a blanditiis quisquam neque quibusdam necessitatibus, perspiciatis dicta debitis? Esse in voluptas reiciendis error, ea commodi sit dicta accusantium laboriosam dignissimos voluptate atque vitae magnam laudantium odit! Nam, nisi voluptate. Ipsam, perspiciatis. Magni explicabo, vel non atque libero illum totam autem qui.</p>
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

.site-container {
  background: #252525;
  background-size: cover;
  background-image: linear-gradient(rgba(37,37,37,1), rgba(0,161,255,0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  height: calc(100vh - 70px);
}

#about-us-layout {
  // background: none;
  color: white;
  min-height: 100%;
  // background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-purple, 0.25)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  background-size: cover;
  // min-height: calc(92vh - 3px);
  top: 58px;
  // position: absolute;
  width: 100%;
}

.content {
  // padding: 20vh 5vw 10% 28vw;
  grid-area: main-content;
}

.page-title {
  font-size: 4rem;
  text-shadow: 0 0 2px #252525;
}
</style>
