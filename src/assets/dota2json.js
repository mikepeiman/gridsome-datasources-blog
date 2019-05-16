const fs = require("fs");
const VDF = require('@node-steam/vdf');

let filepath = "C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/";
let dir = process.cwd()
dir = `${dir}/src/assets/`

function dotaParse(dir, filename) {
  let data = fs.readFile(`${dir}${filename}.txt`, 'utf8', function (err, data) {
    if (err) throw err;
    data = VDF.parse(data)
    data = JSON.stringify(data)
  
    fs.writeFileSync(
      `${filepath}/${filename}.json`,
      data,
      function(err) {
        if (err) {
          console.log(err);
        }
        console.log("The file was saved!");
      }
    );
    // data = JSON.parse(data)
    //   console.log(`testing data object`)
    //   console.log(data.DOTAHeroes.npc_dota_hero_axe)
  });
}

dotaParse(dir, 'dota2_heroes')
dotaParse(dir, 'dota2_items')
dotaParse(dir, 'dota2_abilities')