const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async store => {
    console.log("Datasource loading: graphcms");
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const contentType = store.addContentType({
      typeName: "GraphCMS",
      route: "/graph/:slug"
    });
    contentType.addSchemaField("body", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.body;
      }
    }));
    contentType.addSchemaField("title", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.title;
      }
    }));
    contentType.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.path;
      }
    }));
    contentType.addSchemaField("date", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.date;
      }
    }));
    contentType.addSchemaField("content", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.content;
      }
    }));
    contentType.addSchemaField("excerpt", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.excerpt;
      }
    }));
    contentType.addSchemaField("slug", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.slug;
      }
    }));
    contentType.addSchemaField("subtitle", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.subtitle;
      }
    }));
    contentType.addSchemaField("imageUrl", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.imageUrl;
      }
    }));
    contentType.addSchemaField("datePublished", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.datePublished;
      }
    }));

    const baseUrl =
      "https://api-ca-central-1.graphcms.com/v2/ckvzva8ls471g01yyc87l3lz8/master";
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
        const baseUrl = "https://media.graphcms.com/";

        pData.data.articles.forEach(item => {
          contentType.addNode({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            body: item.body.markdown,
            imageUrl: baseUrl + item.featuredImage.handle,
            datePublished: item.datePublished
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
};
