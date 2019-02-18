const axios = require('axios');

module.exports = function (api) {

api.loadSource(async store => {
  // Use the Data store API here: https://gridsome.org/docs/data-store-api
  const { data } = await axios.get('https://api-uswest.graphcms.com/v1/cjry7p9c42zcv01i63qwszhh9/master')

  const contentType = store.addContentType({
    typeName: 'GraphCMS',
    route: '/Graph/:slug'
  })



  console.log(data)
  // let id = ''
  // data.results.forEach(item => {
  //   // console.log('item.name: ', item.name, 'item.url: ', item.url)
  //   let pathArray = item.url.split('/')
  //   console.log(pathArray)
  //   id = pathArray[5]
  // // for (const item of data.results) {
  //   console.log('blog2 (SWAPI): ', id, item.name, item.starship_class)
  //   let path = `/blog2/${id}`

  //   contentType.addNode({
  //     id: id,
  //     name: item.name,
  //     path,
  //     starshipClass: item.starship_class
  //   })
  // });
// }
})
}
