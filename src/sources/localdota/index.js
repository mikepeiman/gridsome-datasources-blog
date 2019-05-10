console.log("localdota loaded");
const fs = require("fs");
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
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
      route: "/xdota/:id"
    });

    contentType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    contentType.addSchemaField("attackType", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.attackType;
      }
    }));
    contentType.addSchemaField("primaryAttr", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.primaryAttr;
      }
    }));
    contentType.addSchemaField("strBase", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.strBase;
      }
    }));
    contentType.addSchemaField("strGain", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.strGain;
      }
    }));
    contentType.addSchemaField("agiBase", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.agiBase;
      }
    }));
    contentType.addSchemaField("agiGain", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.agiGain;
      }
    }));
    contentType.addSchemaField("intBase", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.intBase;
      }
    }));
    contentType.addSchemaField("intGain", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.intGain;
      }
    }));
    contentType.addSchemaField("totalAttrGain", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.totalAttrGain;
      }
    }));
    contentType.addSchemaField("armor", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.armor;
      }
    }));

    contentType.addSchemaField("attackType", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.attackType;
      }
    }));

    contentType.addSchemaField("attackDamageMin", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.attackDamageMin;
      }
    }));

    contentType.addSchemaField("attackDamageMax", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.attackDamageMax;
      }
    }));

    contentType.addSchemaField("attackRate", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.attackRate;
      }
    }));

    contentType.addSchemaField("attackRange", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.attackRange;
      }
    }));

    contentType.addSchemaField("projectileSpeed", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.projectileSpeed;
      }
    }));

    contentType.addSchemaField("movementSpeed", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.movementSpeed;
      }
    }));

    contentType.addSchemaField("turnRate", ({ graphql }) => ({
      type: graphql.GraphQLFloat,
      resolve(node) {
        return node.fields.turnRate;
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
        var keys = Object.keys(data);
        var values = Object.values(data);

        // console.log(data.npc_dota_hero_grimstroke);

        // let name,
        //   title,
        //   strBase,
        //   strGain,
        //   agiBase,
        //   agiGain,
        //   intBase,
        //   intGain,
        //   primaryAttr,
        //   armor,
        //   attackType,
        //   attackDamageMin,
        //   attackDamageMax,
        //   attackRate,
        //   attackRange,
        //   projectileSpeed,
        //   movementSpeed,
        //   turnRate,

        for (var i in data) {
          hero = data[i];
          if (hero.workshop_guide_name !== undefined) {
            let totalAttrGain =
              hero.AttributeStrengthGain +
              hero.AttributeAgilityGain +
              hero.AttributeIntelligenceGain;

            hero.attackType = hero.AttackCapabilities.toLowerCase().includes(
              "melee"
            )
              ? "Melee"
              : "Ranged";
            console.log(
              `hero ${hero.workshop_guide_name} attack type: ${hero.attackType}`
            );
            contentType.addNode({
              id: hero.HeroID,
              fields: {
                name: hero.workshop_guide_name,
                strBase: hero.AttributeBaseStrength,
                strGain: hero.AttributeStrengthGain,
                agiBase: hero.AttributeBaseAgility,
                agiGain: hero.AttributeAgilityGain,
                intBase: hero.AttributeBaseIntelligence,
                intGain: hero.AttributeIntelligenceGain,
                totalAttrGain: totalAttrGain,
                primaryAttr: hero.AttributePrimary,
                armor: hero.ArmorPhysical,
                attackType: hero.attackType,
                attackDamageMin: hero.AttackDamageMin,
                attackDamageMax: hero.AttackDamageMax,
                attackRate: hero.AttackRate,
                attackRange: hero.AttackRange,
                projectileSpeed: hero.ProjectileSpeed,
                movementSpeed: hero.MovementSpeed,
                turnRate: hero.MovementTurnRate
              }
            });
          }

          heroKeys = Object.keys(data[i]);
          heroValues = Object.values(data[i]);
          let x = 0;

          name = hero.workshop_guide_name;
          strBase = hero.AttributeBaseStrength;
          agiBase = hero.AttributeBaseAgility;
          intBase = hero.AttributeBaseIntelligence;
          strGain = hero.AttributeStrengthGain;
          agiGain = hero.AttributeAgilityGain;
          intGain = hero.AttributeIntelligenceGain;
          primaryAttr = hero.AttributePrimary;

          if (name != undefined) {
            title = name.replace(/\s+/g, "");
            let thisHero = `{"${title}":
                {
                  "name": "${name}",
                  "strBase": ${strBase},
                  "strGain": ${strGain},
                  "agiBase": ${agiBase},
                  "agiGain": ${agiGain},
                  "intBase": ${intBase},
                  "intGain": ${intGain},
                  "primaryAttr": "${primaryAttr}"
                }}`;

            thisHero = thisHero.replace(/\s+/g, "");

            JSON.parse(thisHero);
            heroesList.push(thisHero);
          } else {
          }
        }
        // heroesList.forEach(hero => {
        // GraphQL here
        // })

        return heroesList;
      });
    }

    dotaParse(dir, "dota2_heroes");
  });
};
