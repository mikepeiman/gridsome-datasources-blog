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
dir = `${dir}\\src\\assets\\`;

let heroesList = [];

function dotaParse(dir, filename) {
  let data = fs.readFile(`${dir}${filename}.json`, "utf8", function(err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    data = data.DOTAHeroes;
    var keys = Object.keys(data);
    var values = Object.values(data);

    console.log(data.npc_dota_hero_grimstroke);

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
      // console.log(`%%%%%%%%%%%%%%%%%%% hero key #${i}:!!! ${heroKeys}`)
      // console.log(`%%%%%%%%%%%%%%%%%%% hero values #${i}:!!! ${heroValues}`)
      let x = 0;
      // console.log(hero.HeroID);

      if (hero.HeroID == 129) {

        heroKeys.forEach(key => {
          let currentKeyValue = heroValues[x];
          isItAnObject(currentKeyValue);

          function logObject(obj) {
            let z = 0
            let currentKeys = Object.keys(obj)
            let currentValues = Object.values(obj) 
            
            // console.log(`${x}: @@@ @@@ logObject: this IS an object: ${currentKeys[z]}: ${currentValues[z]} under ${key}`);
            for (var s in obj) {  
              if(typeof obj[s] === "object" && obj[s] !== null) {
                console.log(`logObject(obj) Current object ${s}: ${obj[s]}`)
                return isItAnObject(obj[s])
              } else {
                console.log(`    ${s}: ${obj[s]}`)
              }
              z++
            }
          }
          
          function isItAnObject(o) {      
            // console.log(`${x}: ${key}: ${o}`);
            if (typeof o !== "object") {
              console.log(`${x}: XXX Default case: This one is NOT an object: ${key}: ${o}`);
              return o;
            } else {
              let y = 0
              let currentKeys = Object.keys(o)
              let currentValues = Object.values(o) 
              
              for(var k in currentKeys){
                console.log(`${x}: ${key}: ${currentKeys[y]}:`);
                console.log(`    {`)
                // console.log(`   ${currentKeys[y]}: {`)
                if(typeof currentValues[k] === "object") {
                  // console.log(`    {`)
                  logObject(currentValues[k])
                } else {
                  console.log(`    ${currentKeys[k]}: ${currentValues[k]}`)
                  // console.log(`---------------- ${currentKeys[k]}: ${currentValues[k]} ||| ${key}`)
                }
                console.log(`    }`)
                y++
              }

            }            
          }

          


          // if (typeof currentKeyValue === "object" && currentKeyValue !== null) {
          //   let y = 0;
          //   let currentSubKeys = Object.keys(currentKeyValue);
          //   // console.log(`### This key ${x}: ${key}: ${currentKeyValue}`);
          //   currentSubKeys.forEach(subKey => {
          //     // console.log(
          //     //   `###### This subKey ${x}: ${subKey}: ${
          //     //     Object.values(currentKeyValue)[y]
          //     //   }`
          //     // );
          //     y++;
          //   });
          // } else if (typeof currentKeyValue === null) {
          //   console.log(
          //     `###### TESTED NULL value This key ${x}: ${key}: ${currentKeyValue}`
          //   );
          // } else {
          //   console.log(`### This key ${x}: ${key}: ${currentKeyValue}`);
          // }

          x++;
        });
      }

      // heroValues.forEach(value => {
      //   console.log(`@@@@@@@@ This value: ${value}`)
      // })

      name = hero.workshop_guide_name;

      str_base = hero.AttributeBaseStrength;
      agi_base = hero.AttributeBaseAgility;
      int_base = hero.AttributeBaseIntelligence;
      str_gain = hero.AttributeStrengthGain;
      agi_gain = hero.AttributeAgilityGain;
      int_gain = hero.AttributeIntelligenceGain;
      primary_attr = hero.AttributePrimary;

      if (name != undefined) {
        title = name.replace(/\s+/g, "");
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
    // console.log(`HeroesList: ${heroesList}`);

    // heroesList.forEach(hero => {
    //   hero = JSON.parse(hero)
    //   console.log(`${hero}`)
    // })
    // console.log(heroesList)
    // console.log(keys);
    // console.log(values)
    return heroesList;
  });
}

dotaParse(dir, "dota2_heroes");
