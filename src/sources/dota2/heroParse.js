const $ = require('cheerio');
const rp = require('request-promise');

const heroParse = function(num, name, url, heroImgSrc) {
  return rp(url)
.then(html => {
  let abilities = [];
  const numberOfAbilities = $('.overviewAbilityRowDescription > h2', html).length
  for (let i = 0; i < numberOfAbilities; i++) {
    let ability = $('.overviewAbilityRowDescription > h2', html)[i].children[0].data;
    // console.log('Hero abilities: ', ability)
    abilities.push(ability)
  }
  console.log(`Inside of heroParse: num(${num}) name(${name})`)
  return { num: num, name: name, abilities: abilities, heroImgSrc: heroImgSrc }
})
.catch(err => {
  console.log('error: ', err)
})
}

module.exports = heroParse;