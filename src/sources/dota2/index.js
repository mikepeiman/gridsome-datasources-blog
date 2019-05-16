// const axios = require('axios');
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  buildSchema,
  GraphQLObjectType
} = require("graphql");

const $ = require("cheerio");
const rp = require("request-promise");

// let jsonframe = require("jsonframe-cheerio");
const heroParse = require("./heroParse");
const heroesUrl = "http://www.dota2.com/heroes/";
// ************************

// heroParse('http://www.dota2.com/hero/earthshaker/')
module.exports = function(api) {
  api.loadSource(async store => {
    console.log("Datasource loading: dota2");
    const contentType = store.addContentType({
      typeName: "DOTA2",
      route: "/dota2/:name"
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

    rp(heroesUrl)
      .then(html => {
        let heroesList = [];

        const listLength = $(".heroIcons > a", html).length;
        // console.log("heros list length: ", listLength);

        for (let i = 0; i < listLength; i++) {
          let heroUrl = $(".heroIcons > a", html)[i].attribs.href;
          // console.log('heros Urls: ', i + ': ' + $(".heroIcons > a", html)[i].attribs.href)
          let heroImgSrc = $(".heroHoverLarge", html)[i].attribs.src;
          // console.log('heroImgSrc: ', $('.heroHoverLarge', html)[i].attribs.src)
          let name = $(".heroIcons > a", html)[i].attribs.href.split("/")[4];
          let heroNum = i;
          // console.log('heroNum: ', heroNum)
          let splitName = name.split("_");
          function titleCase(str) {
            return splitName
              .map(word => {
                let newWord = word.charAt(0).toUpperCase() + word.slice(1);
                return newWord;
              })
              .join(" ");
          }
          let heroName = titleCase(splitName);
          heroesList.push({
            num: heroNum,
            name: heroName,
            url: heroUrl,
            heroImgSrc: heroImgSrc
          });
        }
        // console.log('heroesList: ', heroesList)

        return Promise.all(
          heroesList.map(hero => {
            // console.log(`Promise calling heroParse with individual hero URL: ${hero.url}`)
            return heroParse(hero.num, hero.name, hero.url, hero.heroImgSrc);
          })
        );
        // console.log('heroesList: ', heroesList)
        // return heroesList
      })
      .then(async heroes => {
        heroes.forEach(hero => {
          // console.log(`Inside final .then, heroes length: ${heroes.length}`)
          // console.log(`Inside final .then, heroes.forEach: ${hero.num}: ${hero.name}`)
          contentType.addNode({
            num: hero.num,
            name: hero.name,
            abilities: hero.abilities,
            heroImgSrc: hero.heroImgSrc
          });
        });
      })
      .catch(err => {
        console.log("error! ", err);
      });
  });
};
