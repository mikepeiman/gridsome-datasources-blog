<template>
  <Layout>
    Single Post
    <h2>{{$page.post.title}}</h2>
    <h3>{{$page.post.date}}</h3>
    <p>{{$page.post.body}}</p>
  </Layout>
</template>

<page-query>
query GraphCMS ($path: String!){
  post: graphCms (path: $path){
    title
    date
    body
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