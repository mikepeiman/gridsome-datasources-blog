<template>
  <Layout>
    <h2>{{$page.post.name}}</h2>
    <h3>{{$page.post.starshipClass}}</h3>
    <p>{{$page.post.date}}</p>
  </Layout>
</template>

<page-query>
query SWAPI ($path: String!){
  post: swapi (path: $path){
    name
    starshipClass
    path
    date
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