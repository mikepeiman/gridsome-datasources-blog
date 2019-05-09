<template id="swup" class="transition-fade">

  <div>
    <Header></Header>
    <transition name="fade" appear>
    <slot />
    </transition>
  </div>

</template>

<script>
import Header from '~/components/Header.vue';
import swup from 'swup';
var changeCase = require('change-case')

export default {
  components: {
    Header
  },
  metaInfo() {
    return {
    title: changeCase.title(this.$route.name),
    titleTemplate: '%s | MikePeiman.com'
    }
  }
}
</script>

<style scoped lang="scss">
.site-container {
  color: #252525;
}

.page-title {
  text-decoration: none;
}

li {
  list-style: none;
  /* margin-bottom: 2em;
  border-bottom: 3px solid #00ccff; */
}

a {
  text-decoration: none;
  line-height: 1em;
}

.transition-fade {
    transition: .4s;
    opacity: 1;
}
html.is-animating .transition-fade{
    opacity: 0;
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter {
  opacity: 0;
}
</style>
