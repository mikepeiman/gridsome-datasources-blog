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
  post: faker (path: $path){
    title
    date
    slug
    id
    path
  }
}
</page-query>

<script>
export default {
  created: function() {
    console.log(this.$page)
  }
  // metaInfo() {
  //   return {
  //     title: this.$page.post.title
  //   }
  // }
}
</script>