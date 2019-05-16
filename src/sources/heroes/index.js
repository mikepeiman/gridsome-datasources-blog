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
const changeCase = require("change-case");
const heroParse = require("./heroParse");
const heroesUrl = "http://www.dota2.com/heroes/";

module.exports = function(api) {
  api.loadSource(store => {
    console.log("Datasource loading: DOTA2 heroes");

    const DOTA2Heroes = store.addContentType({
      typeName: "DOTA2Heroes",
      route: "/heroes/:name"
    });
    const Abilities = store.addContentType({
      typeName: "Abilities",
      route: "/heroes/:hero/:name"
    });
    const AbilityType = new GraphQLObjectType({
      name: "Ability",
      description: "An ability of a hero",
      fields: () => ({
        id: {
          type: GraphQLString,
          resolve: ability => ability.id
        },
        name: {
          type: GraphQLString,
          resolve: ability => ability.name
        },
        src: {
          type: GraphQLString,
          resolve: ability => ability.src
        },
        desc: {
          type: GraphQLString,
          resolve: ability => ability.desc
        },
        path: {
          type: GraphQLString,
          resolve: ability => ability.path
        }
      })
    });

    Abilities.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.name;
      }
    }));
    Abilities.addSchemaField("root", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.root;
      }
    }));
    Abilities.addSchemaField("src", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.src;
      }
    }));
    Abilities.addSchemaField("desc", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.desc;
      }
    }));
    Abilities.addSchemaField("hero", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.hero;
      }
    }));
    Abilities.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.path;
      }
    }));
    Abilities.addSchemaField("title", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.title;
      }
    }));
    Abilities.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.path;
      }
    }));
    Abilities.addSchemaField("date", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.date;
      }
    }));
    Abilities.addSchemaField("content", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.content;
      }
    }));
    Abilities.addSchemaField("excerpt", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.excerpt;
      }
    }));
    Abilities.addSchemaField("slug", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.slug;
      }
    }));

    DOTA2Heroes.addSchemaField("title", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.title;
      }
    }));
    DOTA2Heroes.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.path;
      }
    }));
    DOTA2Heroes.addSchemaField("date", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.date;
      }
    }));
    DOTA2Heroes.addSchemaField("content", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.content;
      }
    }));
    DOTA2Heroes.addSchemaField("excerpt", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.excerpt;
      }
    }));
    DOTA2Heroes.addSchemaField("slug", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.slug;
      }
    }));
    DOTA2Heroes.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.name;
      }
    }));
    DOTA2Heroes.addSchemaField("num", ({ graphql }) => ({
      type: graphql.GraphQLInt,
      allowNull: false,
      resolve(node) {
        return node.num;
      }
    }));
    DOTA2Heroes.addSchemaField("url", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.url;
      }
    }));
    DOTA2Heroes.addSchemaField("heroImgSrc", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.heroImgSrc;
      }
    }));
    DOTA2Heroes.addSchemaField("abilities", ({ graphql }) => ({
      type: graphql.GraphQLList(AbilityType),
      resolve(node) {
        return node.abilities;
      }
    }));

    // DOTA2Heroes.addReference('abilities', 'Abilities')
    // DOTA2Heroes.addReference('abilities', 'Abilities')

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

        // now we take the complete heroes list scraped from the main page, and we map through it
        // invoking the heroParse() function, which returns more details for each hero (like abilities)

        return Promise.all(
          heroesList.map(hero => {
            return heroParse(hero.num, hero.name, hero.url, hero.heroImgSrc);
          })
        );
      })
      .then(async heroes => {
        let i = 0;
        heroes.forEach(hero => {
          // Now we add each hero node to the GraphQL schema
          // Note that 'abilities' is an array of objects containing ability name, src, and other
          // attributes
          // console.log('Datasource loading: DOTA2Heroes.addNode')

          DOTA2Heroes.addNode({
            title: hero.name,
            path: hero.path,
            fields: {
              num: hero.num,
              name: hero.name,
              heroImgSrc: hero.heroImgSrc,
              abilities: hero.abilities
            }
          });
          hero.abilities.forEach(ability => {
            let path = `/heroes/${hero.name}/${ability.name}`;
            // let i = 0

            ability.path = `/heroes${ability.path}`;
            // hero.abilities[i].path = `/heroes${ability.path}`
            // i++

            Abilities.addNode({
              id: ability.id,
              title: ability.name,
              src: ability.src,
              name: ability.name,
              desc: ability.desc,
              hero: hero.name,
              path: ability.path
            });
          });
        });
      })
      .catch(err => {
        console.log("error! ", err);
      })
      .then(err => {
        console.log(`Final .then in heroes datasource index.js`);
      });
  });
};
