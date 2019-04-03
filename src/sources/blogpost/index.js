const axios = require('axios');

module.exports = function (api) {
  api.loadSource(async store => {
    console.log('Datasource loading: blogpost')
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')

    const contentType = store.addContentType({
      typeName: 'BlogPost',
      route: '/JSONplaceholder/:id'
    })

    for (const item of data) {
      let path = `/JSONplaceholder/${item.id}`
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
}