<template>
  <Layout>
    <h1>Faker</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, porro.</p>
    <ul>
      <li v-for="(item, index) in $page.allFaker.edges" :key="index">
        {{item.node.author}}
        <img :src="item.node.avatar.src">
      </li>
    </ul>
  </Layout>
</template>

<page-query>
{
	allFaker(perPage: 5, sortBy: "author", order: ASC ) {
    edges {
      node {
        author
        email
        avatar
      }
    }
  }
}
</page-query>

<script>
export default {}
</script>
