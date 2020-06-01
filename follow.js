const getFirst = require('./first');

module.exports = function getFollow(rulesArray, simbol, result = []) {

    rulesArray.forEach(element => { 
      element.forEach(item => { 
        if(item.includes(simbol) && simbol != element[0]) { 
          aux = item.split(''); 
          index = aux.indexOf(simbol);
          if(aux[index+1]) {
            
            if(isFinal(aux[index+1])) {
              if(!result.includes(aux[index+1])) {
                result.push(aux[index+1]);
              }
            } else {
              getFirst(rulesArray, aux[index+1]).forEach(element => {
                if(element !== 'Ɛ') {
                  if(!result.includes(element)) {
                    result.push(element);
                  }
                } else {
                  if(!result.includes('$')) {
                    result.push('$');
                  }
                }
              })

              if(getFirst(rulesArray, aux[index+1]).join('').includes('Ɛ')) {
                result.concat(getFollow(rulesArray, element[0], result))
              }
            }
          } else {
            result.concat(getFollow(rulesArray, element[0], result))
          }
        }
      })
    })

    if(simbol === rulesArray[0][0]) {
      if(!result.includes('$')) {
        result.push('$');
      }
    }

    return result;

  }

function isFinal(key) {
  if(key === key.toLowerCase()) {
    return true;
  } 
  return false;
}
