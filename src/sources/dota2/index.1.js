const axios = require('axios');
const $ = require('cheerio');
const rp = require('request-promise');
let jsonframe = require('jsonframe-cheerio');
// let $ = cheerio.load('https://dota2.gamepedia.com/Table_of_hero_attributes');
// jsonframe($);
// let herosList = $('.wikitable')
// console.log('Heros List: ', herosList)
// const { GraphQLSchema, buildSchema, GraphQLObjectType } = require("graphql");
const url = 'https://dota2.gamepedia.com/Table_of_hero_attributes';
// ************************

rp(url)
.then(html => {
  // console.log('success! html table: ', $('.wikitable', html))
  // console.log('******children of table: ', $('.wikitable > tbody > tr', html).length)
  // console.log('******<tr>: ', $('.wikitable > tbody > tr', html))
  let heroNames = [];
  const listLength = $('.wikitable > tbody > tr', html).length;
  for (let i = 0; i < 5; i++) {
    // heroNames.push($('.wikitable > tbody > tr', html)[i])
    console.log(`Iteration ${i}:`, $('.wikitable > tbody > tr > td', html)[i].text())

  }
  console.log(heroNames)
})
.catch(err => {
  console.log('error! ', err)
})

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
