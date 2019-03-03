<template>
  <Layout>
    <h2>{{$page.post.title}}</h2>
    <h3>{{$page.post.excerpt}}</h3>
    <p>{{$page.post.description}}</p>
  </Layout>
</template>

<page-query>
query Post ($path: String!){
  post: post (path: $path){
    title
    path
    date
    description
    excerpt
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