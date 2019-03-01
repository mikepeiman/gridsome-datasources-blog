<template>
  <Layout>
    Single Faker
    <h2>{{$page.post.title}}</h2>
    <h3>{{$page.post.date}}</h3>
    <p>{{$page.post.body}}</p>
  </Layout>
</template>

<page-query>
query Faker ($path: String!){
  faker: post (path: $path){
    title
    body
    date
  }
}
</page-query>

<script>
export default {
  // metaInfo() {
  //   return {
  //     title: this.$page.post.title
  //   }
  // }
}
</script>