const getTable = require('./predictiveTable');

rulesArray = [
    ['S', 'cAa'], ['A', 'cB', 'B'], ['B', 'bcB', 'Ɛ']
]

// console.TABLE to generate it formated!
console.table(getTable(rulesArray));
