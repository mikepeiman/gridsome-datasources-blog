console.log("localdota loaded");
const fs = require("fs");
const slugify = require("slugify");
const changeCase = require("change-case");
const objectPath = require("object-path");

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
dir = `${dir}/src/assets/`;

let heroesList = [];

function dotaParse(dir, filename) {
  let data = fs.readFile(`${dir}${filename}.json`, "utf8", function(err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    data = data.DOTAHeroes;
    var keys = Object.keys(data);
    var values = Object.values(data);

    // console.log(data.npc_dota_hero_grimstroke);

    let name,
      title,
      str_base,
      str_gain,
      agi_base,
      agi_gain,
      int_base,
      int_gain,
      primary_attr;

    for (var i in data) {
      hero = data[i];
      heroKeys = Object.keys(data[i]);
      heroValues = Object.values(data[i]);
      let x = 0;

        heroKeys.forEach(key => {
          let currentKeyValue = heroValues[x];
          isItAnObject(currentKeyValue);

          function logObject(obj) {
            let z = 0
            let currentKeys = Object.keys(obj)
            let currentValues = Object.values(obj) 
            for (var s in obj) {  
              if(typeof obj[s] === "object" && obj[s] !== null) {
                // console.log(`logObject(obj) Current object ${s}: ${obj[s]}`)
                return isItAnObject(obj[s])
              } else {
                // console.log(`    ${s}: ${obj[s]}`)
              }
              z++
            }
          }
          
          function isItAnObject(o) {      
            if (typeof o !== "object") {
              // console.log(`${x}: XXX Default case: This one is NOT an object: ${key}: ${o}`);
              return o;
            } else {
              let y = 0
              let currentKeys = Object.keys(o)
              let currentValues = Object.values(o) 
              
              for(var k in currentKeys){
                // console.log(`${x}: ${key}: ${currentKeys[y]}:`);
                // console.log(`    {`)
                if(typeof currentValues[k] === "object") {
                  logObject(currentValues[k])
                } else {
                  // console.log(`    ${currentKeys[k]}: ${currentValues[k]}`)
                }
                // console.log(`    }`)
                y++
              }

            }            
          }
          x++;
        });
      

      name = hero.workshop_guide_name;
      str_base = hero.AttributeBaseStrength;
      agi_base = hero.AttributeBaseAgility;
      int_base = hero.AttributeBaseIntelligence;
      str_gain = hero.AttributeStrengthGain;
      agi_gain = hero.AttributeAgilityGain;
      int_gain = hero.AttributeIntelligenceGain;
      primary_attr = hero.AttributePrimary;

      if (name != undefined) {
        title = name
        title = title.replace(/\s+/g, "");
        let thisHero = `{"${title}":
            {
              "name": "${name}",
              "str_base": ${str_base},
              "str_gain": ${str_gain},
              "agi_base": ${agi_base},
              "agi_gain": ${agi_gain},
              "int_base": ${int_base},
              "int_gain": ${int_gain},
              "primary_attr": "${primary_attr}"
            }}`;

        thisHero = thisHero.replace(/\s+/g, "");

        JSON.parse(thisHero);
        heroesList.push(thisHero);
      } else {
      }
    }
    // console.log(heroesList)
    heroesList.forEach(hero => {
      hero = JSON.parse(hero)
      for(var x in hero) {
        console.log(x)
        let heroKeys = Object.keys(hero)
        let heroVals = Object.values(hero)
        let heroSets = Object.entries(heroKeys)
 
      }
      console.log(getValueByKey(hero, 'str_base'))
    })
    return heroesList;
  });
  
}
function getValueByKey(object, key) {
  return Object.values(object).find(value => object[value] === key);
}
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}


dotaParse(dir, "dota2_heroes");

