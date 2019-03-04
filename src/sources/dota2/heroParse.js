const $ = require('cheerio');
const rp = require('request-promise');

const heroParse = function(name, url) {
  return rp(url)
.then(html => {
  let abilities = [];
  const numberOfAbilities = $('.overviewAbilityRowDescription > h2', html).length
  for (let i = 0; i < numberOfAbilities; i++) {
    let ability = $('.overviewAbilityRowDescription > h2', html)[i].children[0].data;
    // console.log('Hero abilities: ', ability)
    abilities.push(ability)
  }
  return { name: name, abilities: abilities }
})
.catch(err => {
  console.log('error: ', err)
})
}

module.exports = heroParse;