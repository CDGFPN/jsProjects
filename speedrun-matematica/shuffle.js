//Algoritmo Fisher-Yates de embaralhamento O(n)

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
  
    // Enquanto ainda restam elementos para embaralhar...
    while (currentIndex !== 0) {
      // Escolha o elemento que resta...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // E troque-o com o elemento atual.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  