<template>
  <div>
    <Header></Header>
    <slot />
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
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
</style>
