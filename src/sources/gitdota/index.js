const axios = require('axios');
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  buildSchema,
  GraphQLObjectType
} = require("graphql");


module.exports = function(api) {
  api.loadSource(async store => {
    console.log('Datasource loading: gitdota')
    const contentType = store.addContentType({
      typeName: "gitDOTA2",
      route: "/gitdota2/:name"
    });


    contentType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.name;
      }
    }));
    contentType.addSchemaField("num", ({ graphql }) => ({
      type: graphql.GraphQLInt,
      allowNull: false,
      resolve(node) {
        return node.num;
      }
    }));
    contentType.addSchemaField("url", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.url;
      }
    }));
    contentType.addSchemaField("heroImgSrc", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.heroImgSrc;
      }
    }));
    contentType.addSchemaField("abilities", ({ graphql }) => ({
      type: graphql.GraphQLList(GraphQLString),
      resolve(node) {
        return node.abilities;
      }
    }));



  })
}