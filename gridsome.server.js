// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios');

module.exports = function (api) {
  api.loadSource(async store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')

    const contentType = store.addContentType({
      typeName: 'BlogPost',
      route: '/blog/:slug'
    })

    // console.log(data)
    for (const item of data) {
      // console.log('blog1: ', item)
      let path = `/blog/${item.id}`
      contentType.addNode({
        id: item.id,
        title: item.title,
        path,
        fields: {
          body: item.body
        }
      })
    }
  })
  // api.loadSource(async store => {
  //   // Use the Data store API here: https://gridsome.org/docs/data-store-api
  //   const { data } = await axios.get('https://swapi.co/api/starships')

  //   const contentType = store.addContentType({
  //     typeName: 'SWAPI',
  //     route: '/blog2/:slug'
  //   })



  //   // console.log(data.results)
  //   for (const item of data.results) {
  //     console.log('blog2: ', item.name, item.starship_class)
  //     let path = `/blog2/${item.id}`
  //     contentType.addNode({
  //       // id: item.id,
  //       name: item.name,
  //       // path,
  //       starship_class: item.starship_class
  //     })
  //   }
  // })
}