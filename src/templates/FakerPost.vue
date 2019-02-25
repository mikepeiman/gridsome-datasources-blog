<template>
  <Layout>
    <h2>{{$page.post.title}}</h2>
    <h3>{{$page.post.date}}</h3>
    <p>{{$page.post.body}}</p>
  </Layout>
</template>

<page-query>
query Faker ($path: String!){
  post: faker (path: $path){
    title
    body
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