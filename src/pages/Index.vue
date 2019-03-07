<template>
<Layout>
  <div id="homepage-layout">
    <div class="content">
      <h1 class="page-title">Curriculum For Life</h1>
      <h2 class="sub-title">It didn't come with an instruction manual, did it?</h2>
      <p class="subtext">Fortunately, you don't have to go it alone. We exist in relationship, and we learn from each other. The wisest of us have passed along their learnings over thousands of years. Today, we can discover, collect, synthesize and integrate the wisdom of the ages and the best of modern science to guide us to a better way of life.</p>
    </div>
    <!-- {{ clicked }} -->
    <div class="bottom-line">
      <div class="bottom-line-inner">
        <p>Join The Movement Of Lifelong Learners</p>
        <form action="">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <button>Oh Yeah, I'm In</button>
        </form>
      </div>

    </div>

  </div>
</Layout>
</template>

<script>
export default {
  data: function() {
    return {
      clicked: true
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

.body-style {
  background: #252525;
  background-size: cover;
  background-image: linear-gradient(rgba($primary-graphite, 1), rgba($primary-blue, 0.5)), url('./../assets/papers.co-ml28-space-earth-nature-interstellar-3840x2400-4k-wallpaper.jpg');
  height: 100vh;
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
  padding: 20vh 5vw 5% 28vw;
}

.page-title {
  font-size: 4rem;
  text-shadow: 0 0 2px #252525;
  border-top: 3px solid white;
}

.sub-title {
  padding-bottom: 1rem;
  border-bottom: 3px solid white;
}

.subtext {
  font-size: 1.15rem;
  margin-top: 3rem;
}

.bottom-line {
  font-size: 1.25rem;
  background: rgba($primary-graphite, .75);
  font-weight: 400;
  border-top: 3px solid $primary-blue;
  border-bottom: 3px solid $primary-blue;
}

.bottom-line-inner {
  padding: 10px 10%;
  padding: .5rem 10% 1.5rem 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-bottom: 10px;
  }
}

form {
  align-self: center;
  line-height: 1rem;
  // padding-top: 1.25rem;
}

input {
  height: 2rem;
  margin-left: 2ch;
  padding: 0 2ch;
}

input::placeholder {
  padding-left: 2rem;
}

button {
  margin-left: 1rem;
  display: inline-block;
  border: none;
  padding: .55rem 1.5rem;
  text-decoration: none;
  background: $primary-blue;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out,
    transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}

button:hover,
button:focus {
  background: $primary-purple;
  outline: none;
}

button:focus {
  outline: 1px solid #fff;
  // outline-offset: -4px;
}

button:active {
  transform: scale(0.99);
}
</style>
