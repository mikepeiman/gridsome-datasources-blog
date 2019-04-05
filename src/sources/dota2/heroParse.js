const $ = require('cheerio');
const rp = require('request-promise');
const slugify = require('slugify')
// let x = 0;

const heroParse = function(num, name, url, heroImgSrc) {
  // console.log(`Datasource loading: heroParse #${x++}`)
  return rp(url)
.then(html => {
  let abilities = [];
  const numberOfAbilities = $('.overviewAbilityRowDescription > h2', html).length
  for (let i = 0; i < numberOfAbilities; i++) {
    let name = $('.overviewAbilityRowDescription > h2', html)[i].children[0].data;
    let src = $('.overviewAbilityImg', html)[i].attribs.src;
    let desc = $('.overviewAbilityRowDescription > p', html)[i].children[0].data;
    let heroSlug = url.split("/")[4].replace("_", "-")
    let abilityName = name.toLowerCase()
    let abilitySlug = abilityName.split(" ").join("-")
    let path = "/".concat(heroSlug, "/", abilitySlug)
    // console.log(`hero img src: ${Object.keys(src)}`)
    // console.log(`hero name?: ${this.name}`)
    // console.log(`Hero abilities and src: ${name} ::: ${src}`)
    abilities.push({name: name, src: src, desc: desc, path: path})
  }
  // console.log(`Inside of heroParse: name(${name}) abilities(${abilities})`)
  // abilities.forEach(ability => {
  //    console.log(`abilities.forEach => ability.path(${ability.path})`)
  // })
  return { num: num, name: name, abilities: abilities, heroImgSrc: heroImgSrc }
})
.catch(err => {
  console.log('error in heroParse: ', err)
})
}

module.exports = heroParse;