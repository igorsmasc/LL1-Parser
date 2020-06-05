const getTable = require('./predictiveTable');

// rulesArray = [
//    ['S', 'cAa'], ['A', 'cB', 'B'], ['B', 'bcB', 'Ɛ']
// ]


 rulesArray = [
     ['E', 'TL'], ['L', '+TL', 'Ɛ'], ['T', 'FG'], ['G', '*FG', 'Ɛ'], ['F', '(E)', 'i']
   ]

function getStack(table, entryValue, rulesArray, initialValue = 'default') {
   var Stack = function(Pilha, Entrada, Acao) {
      this.Pilha = Pilha;
      this.Entrada = Entrada;
      this.Acao = Acao;
   }

   if(initialValue == 'default') {
      initialValue = rulesArray[0][0];
   }
   resultStack = [];

   myStack = new Stack(initialValue+'$', entryValue, null);

   
   var status = null;
   var X, a;

   while(status === null) {

      console.log(myStack)
      X = myStack.Pilha[0]
      a = myStack.Entrada[0]
      
      if(X == '$' && a == '$') {
         myStack.Acao = 'Sentença OK';
         resultStack.push(myStack);
         status = 'Reconheceu a sentença'
      } else if (X == a && X != '$') {
         myStack.Acao = 'desempilha ' + X;

         let aux = new Stack(myStack.Pilha, myStack.Entrada, myStack.Acao)

         resultStack.push(aux)

         let auxPilhaEquals =  myStack.Pilha.replace(X, '');
         myStack.Pilha = auxPilhaEquals;

         let auxEntradaEquals = myStack.Entrada.replace(X, '');
         myStack.Entrada = auxEntradaEquals;

         myStack.Acao = undefined;

      } else {
         let entrada = table[0].indexOf(a);
         let pilha;

         table.forEach(element => {
            if(element[0] == X) {
               pilha = element;
            }
         })
         
         
        if(pilha) {
         myStack.Acao = pilha[entrada];
         
         let aux = new Stack(myStack.Pilha, myStack.Entrada, myStack.Acao)

         resultStack.push(aux);

         if(pilha[entrada][1] != 'Ɛ') {
            myStack.Pilha = myStack.Pilha.replace(X, pilha[entrada][1])

         } else {
            myStack.Pilha = myStack.Pilha.replace(X, '')
         }
         myStack.Acao = undefined;
        } else {
         myStack.Acao = 'ERROR';
         resultStack.push(myStack);
         status =  'ERROR';

         }
         
      } 
   }

   console.table(resultStack)
}

getStack(getTable(rulesArray), '+i$', rulesArray, 'L');

