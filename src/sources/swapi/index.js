const axios = require('axios');

module.exports = function (api) {

api.loadSource(async store => {
  // Use the Data store API here: https://gridsome.org/docs/data-store-api
  const { data } = await axios.get('https://swapi.co/api/starships')

  const contentType = store.addContentType({
    typeName: 'SWAPI',
    route: '/blog2/:slug'
  })

  contentType.addSchemaField('name', ({ graphql }) => ({
    type: graphql.GraphQLString,
    resolve (node) {
      return node.name
    }
  }))
  contentType.addSchemaField('starship_class', ({ graphql }) => ({
    type: graphql.GraphQLString,
    resolve (node) {
      return node.starship_class
    }
  }))


  // console.log(data.results)
  let id = ''
  data.results.forEach(item => {
    // console.log('item.name: ', item.name, 'item.url: ', item.url)
    let pathArray = item.url.split('/')
    // console.log(pathArray)
    id = pathArray[5]
  // for (const item of data.results) {
    console.log('blog2 (SWAPI): ', id, item.name)
    let path = `/blog2/${id}`

    contentType.addNode({
      item: item,
      // id: id,
      name: item.name,
      // path,
      starshipClass: item.starship_class
    })
  });
// }
})
}
