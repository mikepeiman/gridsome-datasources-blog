<template>
<Layout>
  <div id="contact-us-layout" class="site-container">
    <div class="content">
      <h1 class="page-title">Contact Us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione iste porro vero facere! Facere veniam at saepe, quam error deleniti officiis alias eum. Deleniti adipisci optio totam qui magnam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat ullam labore animi asperiores porro amet aspernatur molestias at non ut voluptatum quos earum, odio dolore perspiciatis excepturi vitae enim delectus quam repudiandae. Eaque, eligendi earum sequi ipsa nihil illum vitae veniam ratione magni debitis maiores dolorum, tempore, maxime adipisci fugit. Veniam officia, eos deleniti labore repudiandae nobis qui atque, amet fugiat cum autem quisquam est corporis commodi, illum dolores? Ut ducimus illo, ex rerum blanditiis possimus numquam odit atque autem veniam porro voluptatem quasi repellat? Quae excepturi ratione aliquid nostrum ullam qui in! Maxime eaque soluta sint, labore at accusantium ut dolore sed exercitationem deserunt excepturi mollitia veritatis minima ullam consectetur id unde, eius, porro laudantium quasi. Quas mollitia laudantium nobis magni eaque sequi provident praesentium debitis ut recusandae iusto id nulla minus voluptatum expedita nihil ipsa fugit dolor deserunt, odio ex. Ducimus facere officia ut sequi! Incidunt ipsam praesentium ducimus voluptatem sed doloribus eius quod, officiis est repellendus tempora cum voluptatibus quaerat dignissimos, optio, quam amet non minima in omnis similique dicta. Accusantium est, labore molestias ut harum deleniti recusandae, a esse tempora sequi quod doloribus sed eligendi impedit id dignissimos soluta, temporibus quisquam autem. Cumque illo praesentium aliquam libero dicta. Aspernatur obcaecati nulla ipsam eligendi cumque facilis facere excepturi ratione id voluptatem commodi, dolorem quos exercitationem! Est eveniet sint reprehenderit deleniti aliquid sunt accusamus, totam illum necessitatibus rerum dolorem quis impedit dolor quaerat perspiciatis laborum pariatur, quos optio. Quam dicta sequi vitae nostrum fugit quae, temporibus totam numquam tenetur, quis neque. Atque nihil corrupti rem quasi neque ab amet! Cumque at perferendis, consectetur eveniet necessitatibus dicta atque a eius sint culpa eum quasi ipsam nulla nisi, tempore doloremque eligendi? Qui, voluptatem aut, eaque necessitatibus ducimus ex sit voluptatum cum mollitia ad cupiditate autem ab dolores sed excepturi.</p>
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
  // height: 100%;
}

#contact-us-layout {
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
