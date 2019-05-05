const axios = require("axios");
const fs = require("fs");
const VDF = require('@node-steam/vdf');
const { parse, stringify } = require('flatted/cjs');

let filepath = "C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/";
let dir = process.cwd()
dir = `${dir}\\src\\assets\\`

function dotaParse(dir, filename) {
  let data = fs.readFile(`${dir}dota2_heroes.txt`, 'utf8', function (err, data) {
    if (err) throw err;
    data = VDF.parse(data)
    data = JSON.stringify(data)
  
    fs.writeFileSync(
      `${filepath}/dota2_heroes.json`,
      data,
      function(err) {
        if (err) {
          console.log(err);
        }
        console.log("The file was saved!");
      }
    );
    data = JSON.parse(data)
      console.log(`testing data object`)
      console.log(data.DOTAHeroes.npc_dota_hero_axe)
  });
}

















// function getHeroes(url) {
//   // console.log("Commencing todoist data source getdata()");
//   return axios
//     .get(url)
//     .then(data => {
//       // Handle success.
//       console.log(`running`);




//       //encapsulate in braces
//       data = `{${stringify(data)}}`;
      
//       let newData = VDF.parse(data)
//       // newData = JSON.parse(newData)
//       // newData.forEach(item => {
//       //   console.log(`newData item ${item}`)
//       //   console.log(item)
//       // })
//       console.log(newData)

//       let pattern, replacement, result;

//       function makeRegExp(vdf, pattern, replacement) {
//         return vdf.replace(pattern, replacement);
//       }

//       function put(filepath, filename, data, pattern) {
//         // console.log(data)
//         fs.writeFile(
//           `${filepath}/${filename}`,
//           // `${JSON.stringify(data)} yo`,
//           // `${data} xxx`,
//           data,
//           function(err) {
//             if (err) {
//               console.log(err);
//             }
//             console.log("The file was saved!");
//           }
//         );
//       }


//       //replace open braces
//       pattern = /"([^"]*)"(\s*){/;
//       replacement = `"${1}": {`;
//       // console.log(data)
//       data.replace(pattern, replacement)
//       console.log(data)
//       // put(filepath, '/test2.txt', data, /"([^"]*)"(\s*){/)

//       //replace values
//       pattern = /"([^"]*)"\s*"([^"]*)"/;
//       replacement = `"${1}": "${2}",`;
//       data.replace(pattern, replacement)

//       //remove trailing commas
//       pattern = /,(\s*[}\]])/;
//       replacement = `${1}`;
//       data.replace(pattern, replacement)

//       //add commas
//       pattern = /([}\]])(\s*)("[^"]*":\s*)?([{\[])/;
//       replacement = `${1},${2}${3}${4}`;
//       data.replace(pattern, replacement)

//       //object as value
//       pattern = /}(\s*"[^"]*":)/;
//       replacement = `},${1}`;
//       data.replace(pattern, replacement)

//       console.log(data)
//     })
//     .catch(error => {
//       // Handle error.
//       console.log("An error occurred:", error);
//     });
// }

// // getHeroes(
// //   "https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/scripts/npc/npc_heroes.txt"
// // );


// // let filepath = "C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/";
// // let data = 'MIKE!!!'
