console.log("localdota loaded");
const fs = require("fs");
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  buildSchema,
  GraphQLObjectType
} = require("graphql");

let filepath = "C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/";
let dir = process.cwd();
console.log(`current directory process.cwd(): ${dir}`);
dir = `${dir}\\src\\assets\\`;

module.exports = function(api) {
  api.loadSource(async store => {
    console.log("Datasource loading: XDOTA from local JSON");
    const contentType = store.addContentType({
      typeName: "XDOTA",
      route: "/xdota/:name"
    });

    contentType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    contentType.addSchemaField("primary_attr", ({ graphql }) => ({
      type: graphql.GraphQLInt,
      allowNull: false,
      resolve(node) {
        return node.fields.primary_attr;
      }
    }));
    contentType.addSchemaField("stats_str_base", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.stats_str_base;
      }
    }));
    contentType.addSchemaField("stats_str_gain", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.stats_str_gain;
      }
    }));
    contentType.addSchemaField("stats_agi_base", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.stats_agi_base;
      }
    }));
    contentType.addSchemaField("stats_agi_gain", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.stats_agi_gain;
      }
    }));
    contentType.addSchemaField("stats_int_base", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.stats_int_base;
      }
    }));
    contentType.addSchemaField("stats_int_gain", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.stats_int_gain;
      }
    }));

    let heroesList = [];

    function dotaParse(dir, filename) {
      let data = fs.readFile(`${dir}${filename}.json`, "utf8", function(
        err,
        data
      ) {
        if (err) throw err;
        data = JSON.parse(data);
        data = data.DOTAHeroes;
        let name,
          str_base,
          str_gain,
          agi_base,
          agi_gain,
          int_base,
          int_gain,
          primary_attr;
        for (var i in data) {
          name = data[i].workshop_guide_name;
          str_base = data[i].AttributeBaseStrength;
          agi_base = data[i].AttributeBaseAgility;
          int_base = data[i].AttributeBaseIntelligence;
          str_gain = data[i].AttributeStrengthGain;
          agi_gain = data[i].AttributeAgilityGain;
          int_gain = data[i].AttributeIntelligenceGain;
          primary_attr = data[i].AttributePrimary;


          let hero = `${name}
          {
            "str_base": ${str_base},
            "str_gain": ${str_gain},
            "agi_base": ${agi_base},
            "agi_gain": ${agi_gain},
            "int_base": ${int_base},
            "int_gain": ${int_gain},
            "primary_attr": ${primary_attr}
          }`
          heroesList.push(hero);
        }
        console.log(`HeroesList: ${heroesList}`);

        heroesList.forEach(hero => {
          hero = JSON.parse(hero)
          console.log(`Hero ${hero.name}`)
        })

        return heroesList;
      });
    }

    dotaParse(dir, "dota2_heroes");

    // contentType.addSchemaField("url", ({ graphql }) => ({
    //   type: graphql.GraphQLString,
    //   resolve(node) {
    //     return node.fields.url;
    //   }
    // }));

    // contentType.addSchemaField("abilities", ({ graphql }) => ({
    //   type: graphql.GraphQLList(GraphQLString),
    //   resolve(node) {
    //     return node.fields.abilities;
    //   }
    // }));
  });
};
