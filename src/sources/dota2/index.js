// const axios = require('axios');

const $ = require('cheerio');
const rp = require('request-promise');

let jsonframe = require('jsonframe-cheerio');
const heroParse = require('./heroParse');

const heroesUrl = 'http://www.dota2.com/heroes/';
// ************************

// heroParse('http://www.dota2.com/hero/earthshaker/')

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
  console.log('from parseHeroes: ', heroes)
})
.catch(err => {
  console.log('error! ', err)
})
// let testUrl = heroesList[0]
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
