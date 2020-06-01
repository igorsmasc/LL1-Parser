const getFirst = require('./first');
const getFollow = require('./follow');

module.exports = function getTable(rulesArray) {
    varSimbols = [];
    finalSimbols = [' '];
    table = [];

    rulesArray.forEach(element => {
        element.forEach(simbols => {
            simbols.split('').forEach(simbol => {
                if(simbol === simbol.toLowerCase() && simbol != 'Ɛ') {
                    if(!finalSimbols.includes(simbol)) {
                        finalSimbols.push(simbol)
                    }
                } else {
                    if(!varSimbols.includes(simbol) && simbol != 'Ɛ') {
                        varSimbols.push(simbol)
                    }
                }

                
            })
        })
    })
    finalSimbols.push('$')

    table.push(finalSimbols);

    // Rule 1

    rulesArray.forEach(rule => {
        element = rule[0];
        aux = [];
        aux.push(element);
        
        for(i = 1; i < finalSimbols.length; i++) {
            
            if(getFirst(rulesArray, element).includes(finalSimbols[i])){
                myRule = rule.filter(element => (element[0].includes(finalSimbols[i]) || getFirst(rulesArray, element).includes(finalSimbols[i])))
                aux.push(myRule)
            } else {
                aux.push('error')
            };
        }

        table.push(aux);
    })

    // Rule 2

    rulesArray.forEach(rule => {
        element = rule[0];

        if(getFirst(rulesArray, element).includes('Ɛ')) {
            follow = getFollow(rulesArray, element);
            follow.forEach(simbol => {  
                indexSimbol = finalSimbols.indexOf(simbol); 
                table.forEach(rules => {
                    if(rules[0] == element) {
                        myRule = rule.filter(element => (element[0].includes(simbol) || getFollow(rulesArray, element).includes(simbol)))
                        aux.push(myRule)
                        rules[indexSimbol] = myRule;
                    }
                })
            })
        }
    })
  
    return table
  }
