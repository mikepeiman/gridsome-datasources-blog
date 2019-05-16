const axios = require("axios");
// const { GraphQLSchema, buildSchema, GraphQLObjectType } = require("graphql");

// Use the Data store API here: https://gridsome.org/docs/data-store-api
module.exports = function(api) {
  console.log("Datasource loading: swapi");

  api.loadSource(async store => {
    const contentType = store.addContentType({
      typeName: "SWAPI",
      route: "/starwars/:id"
    });

    contentType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.name;
      }
    }));
    contentType.addSchemaField("id", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.id;
      }
    }));
    contentType.addSchemaField("starship_class", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.starship_class;
      }
    }));
    contentType.addSchemaField("url", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.url;
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

    const { data } = await axios.get("https://swapi.co/api/starships");
    data.results.forEach(item => {
      let pathArray = item.url.split("/");
      let id = pathArray[5];
      item.id = id;
      let path = `/starwars/${id}`;
      contentType.addNode({
        date: item.date,
        path,
        id: id,
        name: item.name,
        starship_class: item.starship_class,
        url: item.url
      });
      // console.log('SWAPI item name and path: ', item.name, path)
      // console.log("contentType: ", contentType.collection.data[index].fields);
    });
  });
};
