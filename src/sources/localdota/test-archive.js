function isItAnObject(o) {      
  console.log(`${x}: ${key}: ${o}`);
  if (typeof o === "object" && o !== null) {
    let y = 0
    let currentKeys = Object.keys(o)
    let currentValues = Object.values(o) 
    
    for(var k in currentKeys){
      console.log(`${x}: Object key ____ ${currentKeys[y]} ____ (parent: ${key})`);
      if(typeof currentValues[k] === "object") {
        logObject(currentValues[k])
      } else {
        console.log(`---------------- ${currentKeys[k]}: ${currentValues[k]} ||| ${key}`)
      }
      y++
    }
    
    // logObject(obj)
    // for (var s in obj) {
      
    //   if(typeof obj[s] === "object" && obj[s] !== null) {
    //     console.log(`!!!!!!!!!!! Current object ${s}: ${obj[s]}`)
    //     return isItAnObject(obj[s])
    //   } else {
    //     console.log(`${x}: -------- ${key}:${s}: ${obj[s]}`)
    //   }
    // }
    y++
  } else {
    console.log(`${x}: XXX Default case: This one is NOT an object: ${key}: ${o}`);
    return o;
  }            
}