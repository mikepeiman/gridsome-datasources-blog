const $ = require('cheerio');
const rp = require('request-promise');

const heroParse = function(url) {
  return rp(url)
.then(html => {
  // console.log('Hero abilities: ', $('.overviewAbilityRowDescription > h2', html).text())
  let abilities = [];
  const numberOfAbilities = $('.overviewAbilityRowDescription > h2', html).length
  console.log('num abilities: ', numberOfAbilities)
  for (let i = 0; i < numberOfAbilities; i++) {
    let ability = $('.overviewAbilityRowDescription > h2', html)[i].children[0].data;
    console.log('Hero abilities: ', ability)
    abilities.push(ability)
  }
  console.log('abilities array: ', abilities)
  // let heroAbilities = $('.overviewAbilityRowDescription > h2', html).text()
  // heroAbilities.forEach(ability => {
  //   console.log('ability: ', ability)
  // })

})
.catch(err => {
  console.log('error: ', err)
})
}

module.exports = heroParse;