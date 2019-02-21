const axios = require('axios');
const { GraphQLSchema } = require('graphql');
const { GraphQLObjectType } = require('graphql');

module.exports = function (api) {

api.loadSource(async store => {
  // Use the Data store API here: https://gridsome.org/docs/data-store-api
  const { data } = await axios.get('https://swapi.co/api/starships')

  const contentType = store.addContentType({
    typeName: 'SWAPI',
    route: '/swapi/:id',
  })


  let starships = []
  data.results.forEach((item, index) => {
    // contentType.addSchemaField('name', ({ graphql }) => ({
    //   type: graphql.GraphQLString,
    //   resolve (node) {
    //     return node.fields.name
    //   }
    // }))
    contentType.addNode({
      name: item.name,
      fields: {
        starship_class: item.starship_class
      }
    })
    // console.log('name: ', item.name)
    // console.log('node: ', node)
    let pathArray = item.url.split('/')
    id = pathArray[5]
    console.log('SWAPI: ', id, item.name, item.starship_class)
    console.log('JSON stringify name: ', JSON.stringify(item.name))
    // name = 
    // path = 
    starship_class = item.starship_class
    starships.push(item)
    // contentType.addNode({
    //   id: id,
    //   name: item.name,
    //   content: item.name,
    //   path: `/swapi/${id}`,
    //   starship_class: item.starship_class
    // })
  });
  starships.forEach((item, index) => {
    console.log('*****************************starships[name]: ', starships[index].name)


  })
    // console.log('*****************************item.name ', item.name)
    



 

  contentType.addSchemaField('starship_class', ({ graphql }) => ({
    type: graphql.GraphQLString,
    resolve (node) {
      // console.log('*****************************node.fields ', node.fields)
      return node.fields.starship_class
    }
  }))
  // console.log('starships:', starships)

  const Starships = new GraphQLObjectType({
    name: 'Starship',
    description: 'A single starship',
    fields: () => ({
      name: {
        type: GraphQLString,
        description: 'The name of the starship',
        resolve (node) {
          return node.fields.name
        }
      },
      starship_class: {
        type: GraphQLString,
        description: 'The class of the starship',
        resolve (node) {
          return node.fields.starship_class
        }
      },
      url: {
        type: GraphQLString,
        description: 'The url of the starship',
        resolve (node) {
          return node.fields.url
        }
      },
    })
  })

// }
})
}
