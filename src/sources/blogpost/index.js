const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async store => {
    console.log("Datasource loading: blogpost");
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const contentType = store.addContentType({
      typeName: "BlogPost",
      route: "/placeholder/:id"
    });
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
    for (const item of data) {
      let path = `/placeholder/${item.id}`;
      contentType.addNode({
        id: item.id,
        title: item.title,
        path: path,
        body: item.body
      });
    }
  });
};
