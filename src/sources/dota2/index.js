// const axios = require('axios');

const $ = require('cheerio');
const rp = require('request-promise');

let jsonframe = require('jsonframe-cheerio');
const heroParse = require('./heroParse');
// let $ = cheerio.load('https://dota2.gamepedia.com/Table_of_hero_attributes');
// jsonframe($);
// let herosList = $('.wikitable')
// console.log('Heros List: ', herosList)
// const { GraphQLSchema, buildSchema, GraphQLObjectType } = require("graphql");
const heroesUrl = 'http://www.dota2.com/heroes/';
// ************************

heroParse('http://www.dota2.com/hero/earthshaker/')

rp(heroesUrl)
.then(html => {
  // console.log('success! html table: ', $('.wikitable', html))
  // console.log('******children of table: ', $('.wikitable > tbody > tr', html).length)
  // console.log('******<tr>: ', $('.wikitable > tbody > tr', html))
  let heroUrls = [];
  const listLength = $('.heroIcons > a', html).length;
  console.log('listLength: ', listLength)
  
  for (let i = 0; i < listLength; i++) {
    let heroUrl = $('.heroIcons > a', html)[i].attribs.href;
    heroUrls.push(heroUrl)
    let name = $('.heroIcons > a', html)[i].attribs.href.split('/')[4]
    let splitName = name.split('_')
    function titleCase(str) {
      return splitName.map(word => {
      let newWord = word.charAt(0).toUpperCase() + word.slice(1)
      return newWord
    }).join(' ')
  }
  // console.log('Our Hero: ', titleCase(splitName), heroUrl)
  }
  // console.log('heroUrls: ', heroUrls)
  return heroUrls
})
.catch(err => {
  console.log('error! ', err)
})
// let testUrl = heroUrls[0]
// ************************





// Use the Data store API here: https://gridsome.org/docs/data-store-api
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
    contentType.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.path;
      }
    }));

    // const { data } = await axios.get("https://dota2.gamepedia.com/Table_of_hero_attributes");
    // const sData = JSON.stringify(data)
    // const pData = JSON.parse(sData)

    // console.log('dota2 website data: ', data)
    // console.log('dota2 website data stringified: ', sData)
    // console.log('dota2 website data parsed: ', pData.querySelector(table))
    // data.results.forEach(item => {
    //   console.log(item)
    //   let pathArray = item.url.split("/");
    //   id = pathArray[5];
    //   let path = `/swapi/${id}`
    //   contentType.addNode({
    //     date: item.date,
    //     path,
    //     fields: {
    //       id: id,
    //       name: item.name,
    //       starship_class: item.starship_class,
    //       url: item.url,
    //     }
    //   });
    //   console.log('SWAPI item name and path: ', item.name, path)
      // console.log("contentType: ", contentType.collection.data[index].fields);
    // });  
  });
};
