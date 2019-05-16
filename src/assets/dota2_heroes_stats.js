const fs = require("fs");

let filepath = "C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/";
let dir = process.cwd();
dir = `${dir}/src/assets/`;

function dotaParse(dir, filename) {
  let data = fs.readFile(`${dir}${filename}.json`, "utf8", function(err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    data = data.DOTAHeroes;

    for (var i in data) {
      console.log(`${data[i].workshop_guide_name}`);
    }
  });
}

dotaParse(dir, "dota2_heroes");
