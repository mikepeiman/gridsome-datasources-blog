const axios = require("axios");
// const login = require("./login");
// const { GraphQLSchema, buildSchema, GraphQLObjectType } = require("graphql");
// Use the Data store API here: https://gridsome.org/docs/data-store-api

// Request API.

// function foo() {
//   // RETURN the promise
//   return fetch("/echo/json").then(function(response){
//       return response.json(); // process it inside the `then`
//   });
// }

// foo().then(function(response){
//   // access the value inside the `then`
// })


function login() {
  let token = ''
  return axios
  .post('http://localhost:1337/auth/local', {
      identifier: 'mikepeiman@gmail.com',
      password: '326463'
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    return response.data.jwt
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error);
  });
}

login().then(function(token) {
  console.log(`New function token: ${token}`)
})
let token2 = login()

// const token2 = login().then(token => {
//   console.log(`token from calling login(): ${token}`)
// })

const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0NDA2MDk5LCJleHAiOjE1NTY5OTgwOTl9.HVOhxQ1S0SK2PxCtJa80nEi3eHJgLWcB73ekFhKUSd8';

function myHandler(token) {
  console.log(`myHandler of token result: ${token}`)
}
myHandler(login())

console.log(`token1 from login.js: ${token1}, token2 from response.data.jwt: ${token2}`)


// module.exports = function(api) {
//   console.log('Datasource loading: Strapi')
  
//   api.loadSource(async store => {
//     const contentType = store.addContentType({
//       typeName: 'Strapi',
//       route: '/strapi/:id'
//     });

//     contentType.addSchemaField("name", ({ graphql }) => ({
//       type: graphql.GraphQLString,
//       allowNull: false,
//       resolve(node) {
//         return node.fields.name;
//       }
//     }));
//     contentType.addSchemaField("starship_class", ({ graphql }) => ({
//       type: graphql.GraphQLString,
//       resolve(node) {
//         return node.fields.starshipClass;
//       }
//     }));
//     contentType.addSchemaField("url", ({ graphql }) => ({
//       type: graphql.GraphQLString,
//       resolve(node) {
//         return node.fields.url;
//       }
//     }));
//     contentType.addSchemaField("path", ({ graphql }) => ({
//       type: graphql.GraphQLString,
//       resolve(node) {
//         return node.fields.path;
//       }
//     }));

//     const { data } = await axios.get("http://localhost:1337/posts");
//     data.results.forEach(item => {
//       console.log(`Item from STRAPI posts: ${item}`)
      
//       let pathArray = item.url.split("/");
//       id = pathArray[5];
//       let path = `/strapi/${id}`
//       contentType.addNode({
//         date: item.date,
//         path,
//         fields: {
//           id: id,
//           name: item.name,
//           starship_class: item.starship_class,
//           url: item.url,
//         }
//       });
//     });
//   });
// };
