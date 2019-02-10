<template>
  <Layout>
    <h2>{{$page.post.title}}</h2>
    <h3>{{$page.post.path}}</h3>
    <p>{{$page.post.body}}</p>
  </Layout>
</template>

<page-query>
query BlogPost ($path: String!){
  post: blogPost (path: $path){
    title
    body
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