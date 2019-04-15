const axios = require("axios");
var slugify = require('slugify');
var changeCase = require('change-case');
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  buildSchema,
  printSchema,
  GraphQLObjectType
} = require("graphql");

function login(user, password) {
  let token = "";
  return axios
    .post("http://localhost:1337/auth/local", {
      identifier: user,
      password: password
    })
    .then(response => {
      // Handle success.
      // console.log('Well done!');
      // console.log('User profile', response.data.user);
      // console.log('User token', response.data.jwt);
      token = response.data.jwt;
      return token;
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred:", error);
    });
}

function getPosts(user, password) {
  return login(user, password).then(token => {
    return axios
      .get("http://localhost:1337/posts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // Handle success.
        return response.data;
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  });
}

module.exports = function(api) {
  console.log("Datasource loading: Strapi");

  api.loadSource(async store => {
    const contentType = store.addContentType({
      typeName: "Strapi",
      route: "/strapi-cms/:slug"
    });
    const Category = new GraphQLObjectType({
      name: 'Category',
      description: 'A way to categorize content',
      fields: () => ({
        name: {
          type: GraphQLString,
          resolve: category => category.name
        },
      })
    })

    contentType.addSchemaField("title", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.title;
      }
    }));
    contentType.addSchemaField("subtitle", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.subtitle;
      }
    }));
    contentType.addSchemaField("body", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.body;
      }
    }));
    contentType.addSchemaField("categories", ({ graphql }) => ({
      type: graphql.GraphQLList(Category),
      resolve(node) {
        return node.fields.categories;
      }
    }));

    // getPosts("mikepeiman@gmail.com", "326463").then(data => {
    //   console.log(`STRAPI: final .then data: `);
    //   // console.log(data)
    //   data.forEach(item => {
    //     item.slug = changeCase.lower(slugify(item.title))
    //     item.path = `/strapi-cms/${item.slug}`
    //     console.log(`item path: ${item.path}`)
    //     contentType.addNode({
    //       date: item.created_at,
    //       path: item.path,
    //       fields: {
    //         id: item.id,
    //         title: item.title,
    //         subtitle: item.subtitle,
    //         body: item.body,
    //         categories: item.categories
    //       }
    //     });

    //   });
    // });
  });
};
