const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const contentType = store.addContentType({
      typeName: "GraphCMS",
      route: "/Graph/:slug"
    });
    contentType.addSchemaField("body", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.body;
      }
    }));
    contentType.addSchemaField("subtitle", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.subtitle;
      }
    }));
    contentType.addSchemaField("imageUrl", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.imageUrl;
      }
    }));
    contentType.addSchemaField("datePublished", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.datePublished;
      }
    }));

    const baseUrl =
      "https://api-uswest.graphcms.com/v1/cjry7p9c42zcv01i63qwszhh9/master";
    axios({
      url: baseUrl,
      method: "post",
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

        // console.log("Stringified result: ", sData);
        console.log("Parsed JSON result: ", pData.data.articles);
        const baseUrl = 'https://media.graphcms.com/';

        pData.data.articles.forEach(item => {
          console.log("Article title: ", item.title);
          console.log("Article subtitle: ", item.subtitle);
          console.log("Article date published: ", item.datePublished);
          console.log("Article body (markdown): ", item.body.markdown);
          console.log("Article image handle: ", item.featuredImage.handle);

          

          contentType.addNode({
            id: item.id,
            datePublished: item.datePublished,
            title: item.title,
            subtitle: item.subtitle,
            fields: {
              body: item.body.markdown,
              imageUrl: baseUrl + item.featuredImage.handle
            }
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
  // }
};

// articles {
//   title
//   subtitle
//   body
//   datePublished
//   featuredImage
// }
