module.exports = function getFirst(rulesArray, simbol, result = [], add = true) {
    let simbolArray;
    let removeEpsilon;
  
    rulesArray.forEach(element => {
      if(element[0] === simbol) {
        simbolArray = element.slice(0);;
      }
    })
  
    if(simbolArray && simbolArray.length > 1) {
      simbolArray.shift();
  
      simbolArray.forEach(simbol => {
        
        if((simbol.length == 2) &&  hasEpsilon(rulesArray, simbol[0]) && hasEpsilon(rulesArray, simbol[1])) {
          removeEpsilon = true;
        } else {
          removeEpsilon = false;
        }
  
        if((simbol[0] === simbol[0].toLowerCase())) {
          if(!result.includes(simbol[0])) {
            result.push(simbol[0]);
          }
        } else if((simbol[0] == 'Ɛ' && !removeEpsilon && add)) {
          if(!result.includes(simbol[0])) {
            result.push(simbol[0]);
          }
        }
        else {
          
          if(simbol[1] && hasEpsilon(rulesArray, simbol[0]) && hasEpsilon(rulesArray, simbol[1])) {
            result.concat(getFirst(rulesArray, simbol[0], result, false));
            result.concat(getFirst(rulesArray, simbol[1], result, false));
          } else if(simbol[1] && hasEpsilon(rulesArray, simbol[0])) {
            result.concat(getFirst(rulesArray, simbol[0], result));
            result.concat(getFirst(rulesArray, simbol[1], result, false));
          } else {
            result.concat(getFirst(rulesArray, simbol[0], result));
          }
          
        }
      })
    }
  
    return result
  }
  
  function hasEpsilon(rulesArray, simbol) {
    let simbolArray;
    let result;
  
    rulesArray.forEach(element => {
      if(element[0] === simbol) {
        simbolArray = element;
        if(simbolArray.includes('Ɛ')){
          result = true;
        }
      }
    })
    return result;
  }
