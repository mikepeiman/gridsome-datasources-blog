const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async store => {
    console.log('Datasource loading: graphcms')
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const contentType = store.addContentType({
      typeName: 'GraphCMS',
      route: '/graph/:slug'
    });
    contentType.addSchemaField('body', ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.body;
      }
    }));
    contentType.addSchemaField('subtitle', ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.subtitle;
      }
    }));
    contentType.addSchemaField('imageUrl', ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.imageUrl;
      }
    }));
    contentType.addSchemaField('datePublished', ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.datePublished;
      }
    }));

    const baseUrl =
      'https://api-uswest.graphcms.com/v1/cjry7p9c42zcv01i63qwszhh9/master';
    axios({
      url: baseUrl,
      method: 'post',
      data: {
        query: `
        query {
            articles {
              title
              subtitle
              datePublished
              body {
                raw
                html
                markdown
              }
              featuredImage {
                handle
              }
            }
        }
        `
      }
    })
      .then(result => {
        const sData = JSON.stringify(result.data);
        const pData = JSON.parse(sData);
        const baseUrl = 'https://media.graphcms.com/';

        pData.data.articles.forEach(item => {
          contentType.addNode({
            id: item.id,
            // path,
            fields: {
              title: item.title, 
              subtitle: item.subtitle,
              body: item.body.markdown,
              imageUrl: baseUrl + item.featuredImage.handle,
              datePublished: item.datePublished,
            }
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};