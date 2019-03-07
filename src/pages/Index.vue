<template>
<Layout>
  <div id="homepage-layout">
    <div class="content">
      <h1 class="page-title">Curriculum For Life</h1>
      <h2>It didn't come with an instruction manual, did it?</h2>
      <p>Fortunately, you don't have to go it alone. We exist in relationship, and we learn from each other. The wisest of us have passed along their learnings over thousands of years. Today, we can discover, collect, synthesize and integrate the wisdom of the ages and the best of modern science to guide us to a better way of life.</p>
      <p class="bottom-line">Join us on the journey of a lifetime - to radically heightened self-awareness and the development of human potential.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione fugit sunt consequuntur officiis quia placeat voluptate facere possimus accusantium harum excepturi similique tempora, aliquam voluptatum modi atque numquam, itaque soluta iste dolores, maiores vel ipsam. Enim quae repellat id, dignissimos qui labore vero perferendis? Culpa minus veritatis ad, iusto cum eum numquam harum alias aspernatur, vitae eius odit ipsa at voluptate eos nostrum sint! Quisquam accusamus, minima dolor eveniet nihil dignissimos amet obcaecati aliquam sapiente ea unde, dolore quod nesciunt ipsa officia? Ducimus dicta odit incidunt! Doloremque, fugit natus. Praesentium ad dicta ipsa id enim maxime, quasi exercitationem aliquam esse molestiae dolores fugit quam sequi aspernatur, consequuntur vitae minima pariatur perferendis animi laudantium facere doloremque, repudiandae obcaecati. Accusantium harum perferendis rem, omnis ratione inventore vitae, animi voluptatum, beatae repellat vero blanditiis illo iste natus. Labore accusamus fuga corrupti sunt voluptas incidunt mollitia eos, modi at asperiores quod quos placeat, illo omnis nihil iure deserunt non assumenda molestias reiciendis. Modi sequi nam consequatur sit, quae temporibus culpa id facere rem, cum reprehenderit in quia? Maiores praesentium maxime repudiandae nihil natus fugit facere ut laboriosam, magni optio dolorum earum delectus cupiditate recusandae porro blanditiis, illum aliquid sint molestias veritatis voluptate ab iste.</p>
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

.body-style {
  background: #252525;
  background-size: cover;
  background-image: linear-gradient(rgba(37,37,37,1), rgba(0,161,255,0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  // height: 100%;
}

#homepage-layout {
  // background: none;
  color: white;
  min-height: 100%;
  // background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-purple, 0.25)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  background-size: cover;
  // min-height: calc(92vh - 3px);
  // top: 58px;
  // position: absolute;
  width: 100%;
}

.content {
  padding: 20vh 5vw 10% 28vw;
}

.page-title {
  font-size: 4rem;
  text-shadow: 0 0 2px #252525;
}
</style>
