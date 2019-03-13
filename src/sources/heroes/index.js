const {
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  buildSchema,
  printSchema,
  GraphQLObjectType
} = require("graphql");

const $ = require("cheerio");
const rp = require("request-promise");
const heroParse = require("../dota2/heroParse");
const heroesUrl = "http://www.dota2.com/heroes/";

module.exports = function(api) {
  api.loadSource(async store => {
    const Heroes = store.addContentType({
      typeName: "Heroes",
      route: "/heroes/:name"
    });
    const AbilityType = new GraphQLObjectType({
      name: 'Ability',
      description: 'An ability of a hero',
      fields: () => ({
        name: {
          type: GraphQLString,
          resolve: ability => ability.name
        },
        src: {
          type: GraphQLString,
          resolve: ability => ability.src
        },
      })
    })


    Heroes.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    Heroes.addSchemaField("num", ({ graphql }) => ({
      type: graphql.GraphQLInt,
      allowNull: false,
      resolve(node) {
        return node.fields.num;
      }
    }));
    Heroes.addSchemaField("url", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.url;
      }
    }));
    Heroes.addSchemaField("heroImgSrc", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.heroImgSrc;
      }
    }));
    Heroes.addSchemaField("abilities", ({ graphql }) => ({
      type: graphql.GraphQLList(AbilityType),
      resolve(node) {
        return node.fields.abilities;
      }
    }));

    rp(heroesUrl)
      .then(html => {
        let heroesList = [];
        
        const listLength = $(".heroIcons > a", html).length;
        // console.log("heros list length: ", listLength);

        // here we have scraped the main heroes page to determine number of heroes
        // then we loop through using a simple for-loop to store name, url, and image src
        // we push these into an array [heroesList] of hero objects

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

        // now we take the complete heroes list scraped from the main page, and we map through it
        // invoking the heroParse() function, which returns more details for each hero (like abilities) 

        return Promise.all(
          heroesList.map(hero => {
            // console.log(`Promise calling heroParse with individual hero URL: ${hero.url}`)
            return heroParse(hero.num, hero.name, hero.url, hero.heroImgSrc);
          })
        )
        // console.log('heroesList: ', heroesList)
        // return heroesList
      })
      .then(async heroes => {
        heroes.forEach(hero => {
          // console.log(`Inside final .then, heroes length: ${heroes.length}`)
          // console.log(`Inside final .then, heroes.forEach: ${hero.name}:`)
          // hero.abilities.forEach(a => {
          //   console.log(`${hero.name} ability: ${a.name}, ${a.src}`)
          // })

          // Now we add each hero node to the GraphQL schema
          // Note that 'abilities' is an array of objects containing ability name, src, and other
          // attributes

          Heroes.addNode({
            fields: {
              num: hero.num,
              name: hero.name,
              abilities: hero.abilities,
              heroImgSrc: hero.heroImgSrc
            }
          });
          
            // console.log(`inside of Heroes.addNode for ${hero.name} each ability: ${ability.name}`)
            // Heroes.addNode({
            //   fields: {
            //     abilityName: ability.name,
            //     abilitySrc: ability.src
            //   }
            // })

        });
      })
      .catch(err => {
        console.log("error! ", err);
      });
  });
};
