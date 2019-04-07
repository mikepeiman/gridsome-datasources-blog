const axios = require("axios");
// const { GraphQLSchema, buildSchema, GraphQLObjectType } = require("graphql");

// Use the Data store API here: https://gridsome.org/docs/data-store-api
module.exports = function(api) {
  console.log('Datasource loading: swapi')

  api.loadSource(async store => {
    const contentType = store.addContentType({
      typeName: 'SWAPI',
      route: '/extra/swapi/:id'
    });

    contentType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    contentType.addSchemaField("starship_class", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.starshipClass;
      }
    }));
    contentType.addSchemaField("url", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.url;
      }
    }));
    contentType.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.path;
      }
    }));

    const { data } = await axios.get("https://swapi.co/api/starships");
    data.results.forEach(item => {
      
      let pathArray = item.url.split("/");
      id = pathArray[5];
      let path = `/swapi/${id}`
      contentType.addNode({
        date: item.date,
        path,
        fields: {
          id: id,
          name: item.name,
          starship_class: item.starship_class,
          url: item.url,
        }
      });
      // console.log('SWAPI item name and path: ', item.name, path)
      // console.log("contentType: ", contentType.collection.data[index].fields);
    });
  });
};
