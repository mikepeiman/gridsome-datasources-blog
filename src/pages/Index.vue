<template>
<Layout>
  <div id="homepage-layout" class="site-container">
    <div class="content">
      <h1 class="page-title">Curriculum For Life</h1>
      <h2 class="sub-title">It didn't come with an instruction manual, did it?</h2>
      <p class="subtext">Fortunately, you don't have to go it alone. We exist in relationship, and we learn from each other. The wisest of us have passed down their learnings over thousands of years. Today, we can discover, collect, synthesize and integrate the wisdom of the ages with the best of modern science to guide us - reliably and consistently - to a better way of life.</p>
    </div>
    <!-- {{ clicked }} -->
    <div class="bottom-line">
      <div class="bottom-line-inner">
        <p>Join The Movement Of Lifelong Learners</p>
        <form action="">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <button>I'm A Lifelong Learner!</button>
        </form>
      </div>

    </div>

  </div>
</Layout>
</template>

<script>
export default {
  data: function () {
    return {
      clicked: true
    }
  }
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
  grid-template-columns: 1fr 2fr 2em 8fr;
  grid-template-areas: ". . . ."". cta . main-content";
  grid-template-rows: minmax(184px, 1fr) auto 1fr;
}

#homepage-layout {
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
  text-shadow: 0 0 2px $primary-graphite;
  color: $primary-blue;
  border-top: 3px solid $primary-blue;

  ::after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10px;
    border-bottom: 10px solid #000;
    content: ""
  }
}

.sub-title {
  padding-bottom: 1rem;
  border-bottom: 3px solid $primary-blue;
}

.subtext {
  font-size: 1.15rem;
  margin-top: 3rem;
}

.bottom-line {
  // position: absolute;
  grid-area: cta;
  padding: 0 1em;
  margin: 0 1em;
  bottom: 0;
  font-size: 1.25rem;
  background: rgba($primary-graphite, .75);
  font-weight: 400;
  border-top: 3px solid $primary-blue;
  border-bottom: 3px solid $primary-blue;
  height: 320px;
}

.bottom-line-inner {
  // padding: 0 10% 10px 10%;
  padding: 0rem 10% 1.5rem 10%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 10px;
    color: $primary-green;
  }
}

form {
  align-self: center;
  line-height: 1rem;
  // padding-top: 1.25rem;
}

input {
  height: 2rem;
  margin: 0.5em 1em;
  padding: 0 1em;
  border-radius: 5px;
}

input:hover,
input:focus {
  outline: $primary-green;
  outline-color: $primary-white;
}

input::placeholder {
  padding-left: 2rem;
}

button {
  margin: 1em;
  border-radius: 5px;
  display: inline-block;
  border: 1px solid rgba($primary-white, .5);
  padding: .42rem 1.5rem;
  text-decoration: none;
  background: $secondary-green;
  color: $primary-white;
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
  background: $primary-green;
  border: 1px solid $primary-white;
  outline: none;
  color: $primary-white;
  transition: all .25s ease;
}

button:focus {
  outline: 1px solid #fff;
  // outline-offset: -4px;
}

button:active {
  transform: scale(0.99);
}
</style>
