<template>
  <Layout>
    <h2>{{$page.post.resort}}</h2>
    <h3>{{$page.post.price}}: {{$page.post.currency}}</h3>
  </Layout>
</template>

<page-query>
query Airtable ($path: String!){
  post: airtable (path: $path){
    resort
    price
    currency
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