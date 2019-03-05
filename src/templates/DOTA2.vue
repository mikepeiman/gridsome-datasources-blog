<template>
  <Layout>
    <h2>Hero: {{$page.post.name}}</h2>
    <ul v-for="ability in $page.post.abilities">
      <li>{{ ability }}</li>
    </ul>
  </Layout>
</template>

<page-query>
query DOTA2 ($path: String!){
  post: dota2 (path: $path){
    name
    abilities
    path
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title
    }
  }
}
</script>