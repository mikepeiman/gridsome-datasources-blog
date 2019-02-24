const axios = require('axios');

module.exports = function (api) {

api.loadSource(async store => {
  // Use the Data store API here: https://gridsome.org/docs/data-store-api
  const baseUrl = 'https://api-uswest.graphcms.com/v1/cjry7p9c42zcv01i63qwszhh9/master'
  axios({
    url: baseUrl,
    method: 'post',
    data: {
      query: `
        query {
          articles {
            title 
            body
            date
          }
        }
        `
      }
    }).then((result) => {
      // console.log(JSON.stringify(result.data))
      // console.log(JSON.stringify(result.data.articles[title]))
      // console.log(result.data.articles[0].title)
      // console.log('about to loop through GraphCMS axios result...')
      const sData = JSON.stringify(result.data)
      // console.log('sData: ', sData)
      
      const pData = JSON.parse(sData)
      console.log('pData: ', pData)
      console.log('pData.data.articles: ', pData.data.articles)
      console.log('pData.data.articles.title: ', pData.data.articles.title)
      // const pArticles = JSON.stringify(pData.articles)
      // console.log('pArtices: ', pArticles)

      // const getNestedObject = (pData, articles) => {
      //   return articles.reduce
      // }

      pData.data.articles.forEach(item => {
        // console.log('item: ', item)
        contentType.addNode({
          id: item.id,
          title: item.title,
          content: item.body
        })
      })
    }).catch(error => {
      console.log(error)
    })
  const contentType = store.addContentType({
    typeName: 'GraphCMS',
    route: '/Graph/:slug'
  })

  // console.log(response)
  // let id = ''
  // result.data.forEach(item => {
  // //   // console.log('item.name: ', item.name, 'item.url: ', item.url)
  // //   let pathArray = item.url.split('/')
  // //   console.log(pathArray)
  // //   id = pathArray[5]
  // // // for (const item of data.results) {
  // //   console.log('blog2 (SWAPI): ', id, item.name, item.starship_class)
  // //   let path = `/blog2/${id}`

  //   contentType.addNode({
  //     id: item.id,
  //   })
  });
// }
}

