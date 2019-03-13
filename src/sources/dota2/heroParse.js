const $ = require('cheerio');
const rp = require('request-promise');

const heroParse = function(num, name, url, heroImgSrc) {
  return rp(url)
.then(html => {
  let abilities = [];
  const numberOfAbilities = $('.overviewAbilityRowDescription > h2', html).length
  for (let i = 0; i < numberOfAbilities; i++) {
    let name = $('.overviewAbilityRowDescription > h2', html)[i].children[0].data;
    let src = $('.overviewAbilityImg', html)[i].attribs.src;
    // console.log(`hero img src: ${Object.keys(src)}`)
    // console.log(`hero img src: ${src}`)
    // console.log(`Hero abilities and src: ${name} ::: ${src}`)
    abilities.push({name: name, src: src})
  }
  // console.log(`Inside of heroParse: name(${name}) abilities(${abilities})`)
  // abilities.forEach(ability => {
  //   console.log(`abilities.forEach => ability.name(${ability.name})`)
  // })
  return { num: num, name: name, abilities: abilities, heroImgSrc: heroImgSrc }
})
.catch(err => {
  console.log('error: ', err)
})
}

module.exports = heroParse;