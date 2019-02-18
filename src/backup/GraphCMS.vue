<template>
  <Layout>
    <h2>{{$page.post.title}}</h2>
    <h3>{{$page.post.path}}</h3>
    <p>{{$page.post.body}}</p>
  </Layout>
</template>

<page-query>
query GraphCMS ($path: String!){
  item: graphCMS (path: $path){
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: "Title"
    }
  }
}
</script>