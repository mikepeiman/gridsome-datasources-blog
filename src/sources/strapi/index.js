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

function login(user, password) {
  let token = ''
  return axios
  .post('http://localhost:1337/auth/local', {
      identifier: user,
      password: password
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    token = response.data.jwt
    return token
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error);
  });
}

function getPosts(user, password) {
  login(user, password).then(token => {
  console.log(`token from calling login(): ${token}`)
  axios
  .get('http://localhost:1337/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    // Handle success.
    console.log('Data: ', response.data);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error);
  });
})
}

getPosts('mikepeiman@gmail.com', '326463')


// async function getToken() {
//   try {
//     await login()
//   } catch(err) {
//     console.log(`getToken error: ${err}`)
//     return 'Error in getToken()'
//   }
// }

// let token = login().then(res => {
//   return res
// })
// let token = getToken()

// console.log(`getToken: ${token}`)

// login().then(token => {
//   console.log(`New function token: ${token}`)
// })

// let token2 = login()

// const token2 = login().then(token => {
//   console.log(`token from calling login(): ${token}`)
// })
// console.log(`token2 = ${token2}`)

// const token2 = Promise.resolve(login())

// token2.then(token => {
//   console.log(`token from calling login(): ${token}`)
// })
// console.log(`token2 = ${token2}`)

const givenToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0NDA2MDk5LCJleHAiOjE1NTY5OTgwOTl9.HVOhxQ1S0SK2PxCtJa80nEi3eHJgLWcB73ekFhKUSd8';

// function getToken(token) {
//   console.log(`getToken of token result: ${token}`)
//   return Promise.token
// }
// getToken(login())
// let token = await getToken(login()).then(token => result.data)
// console.log(`Trying to set token to a global variable: ${token}`)


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
