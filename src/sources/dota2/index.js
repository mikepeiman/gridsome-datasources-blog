// const axios = require('axios');
const { GraphQLSchema, GraphQLList, GraphQLString, buildSchema, GraphQLObjectType } = require("graphql");

const $ = require('cheerio');
const rp = require('request-promise');

let jsonframe = require('jsonframe-cheerio');
const heroParse = require('./heroParse');

const heroesUrl = 'http://www.dota2.com/heroes/';
// ************************

// heroParse('http://www.dota2.com/hero/earthshaker/')
module.exports = function(api) {
  api.loadSource(async store => {
    const contentType = store.addContentType({
      typeName: 'DOTA2',
      route: '/dota2/:id'
    });

    contentType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    contentType.addSchemaField("url", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.url;
      }
    }));
    contentType.addSchemaField("abilities", ({ graphql }) => ({
      type: graphql.GraphQLList(GraphQLString),
      resolve(node) {
        return node.fields.abilities;
      }
    }));


rp(heroesUrl)
.then(html => {
  let heroesList = [];
  const listLength = $('.heroIcons > a', html).length;
  // console.log('listLength: ', listLength)
  
  for (let i = 0; i < listLength; i++) {
    let heroUrl = $('.heroIcons > a', html)[i].attribs.href;
    
    let name = $('.heroIcons > a', html)[i].attribs.href.split('/')[4]
    let splitName = name.split('_')
    function titleCase(str) {
      return splitName.map(word => {
      let newWord = word.charAt(0).toUpperCase() + word.slice(1)
      return newWord
    }).join(' ')
  }
  let heroName = titleCase(splitName)
  heroesList.push({ name: heroName, url: heroUrl})
  }
  return Promise.all(
    heroesList.map(function(hero) {
      return heroParse(hero.name, hero.url);
    })
  );
  // console.log('heroesList: ', heroesList)
  // return heroesList
})
.then(heroes => {
      heroes.forEach(hero => {
      // console.log('HERO: ', hero)
      // let pathArray = item.url.split("/");
      // id = pathArray[5];
      // let path = `/swapi/${id}`
      contentType.addNode({
        fields: {
          name: hero.name,
          abilities: hero.abilities
        }
      });
      // console.log('SWAPI item name and path: ', item.name, path)
      // console.log("contentType: ", contentType.collection.data[index].fields);
    });  
})
.catch(err => {
  console.log('error! ', err)
})



    // console.log('data: ', data)


  });
};
