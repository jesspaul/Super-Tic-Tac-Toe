//colors
let innerSquareColor = '#D6EADF';
let nextPlayColor = '#B8E0D2';
let currentPlayerColor = 'white';
let winningBackgroundColor = 'linear-gradient(#ECC30B, #F79D65, #FF2ECC)';
let winningPlayerColor = 'white';

//save necessary elements as JavaScript variables
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player1text = document.getElementById('player1-text');
const player2text = document.getElementById('player2-text');
const instructText = document.getElementById('instruct-text');
const instructLabel = document.getElementById('instruct');
const showHide = document.getElementById('show-hide');
const instructions = document.querySelector('.instructions');
const intro = document.querySelector('.intro');

//check if the square has already been played
const x = 'X';
const o = 'O';
let nextSquare = '';
let justPlayed = '';

const isPlayed = square => {
  if (square.innerHTML === x || square.innerHTML === o) {
    return true;
  } else {
    return false;
  }
}

//plays square after user clicks it
const clickSquare = (square) => {
  justPlayed = square.target.id.slice(0, 2);
  nextSquare = square.target.id.slice(3, 5);
  addClicksToNextBox(nextSquare);
  if (document.getElementById(nextSquare).classList.contains('played')) {
    addClicksToAll();
    document.querySelectorAll('.interior').forEach(square => {
      square.style.backgroundColor = nextPlayColor;
    })
    removeClicksFromPlayed();
  }
  if (turn === 0) {
    square.target.innerHTML = x;
    square.target.style.visibility = 'visible';
    square.target.classList.add('.played');
    player2.style.display = 'block';
    player1.style.display = 'none';
    turn = 1;
    removeClicksFromPlayed();
    checkInterior(justPlayed);
  } else if (turn === 1) {
    square.target.innerHTML = o;
    square.target.classList.add('.played');
    player2.style.display = 'none';
    player1.style.display = 'block';
    turn = 0;
    removeClicksFromPlayed();
    checkInterior(justPlayed);
  }
  if (document.getElementById(nextSquare).classList.contains('played')) {
    addClicksToAll();
    document.querySelectorAll('.interior').forEach(square => {
      square.style.backgroundColor = nextPlayColor;
    })
  }
  checkExterior();
}


//make squares clickable or not if already played
const addClick = input => {
  input.addEventListener('click', clickSquare);
};
const removeClick = input => {
  input.removeEventListener('click', clickSquare);
};

//make every square clickable to start game
const addClicksToAll = () => {
  document.querySelectorAll('.interior').forEach(square => {
  if (isPlayed(square) === false) {
    addClick(square);
  }
});
}

//remove clicks from every square when game ends
const removeClicksFromAll = () => {
  document.querySelectorAll('.interior').forEach(square => {
    removeClick(square);
    square.style.backgroundColor = innerSquareColor;
  });
}

//make squares that already have x or o not clickable
const removeClicksFromPlayed = () => {
  document.querySelectorAll('.interior').forEach(square => {
  if (isPlayed(square) === true) {
    removeClick(square);
    square.style.backgroundColor = innerSquareColor;
  }
});
} 

//make only next box clickable
const addClicksToNextBox = nextbox => {
  document.querySelectorAll('.interior').forEach(square => {
    if (square.className === 'interior ' + nextbox) {
      addClick(square);
      square.style.backgroundColor = nextPlayColor;
    } else {
      removeClick(square);
      square.style.backgroundColor = innerSquareColor;
    }
});
}

//play! 
let turn = 0;
player1.style.color = currentPlayerColor;
player2.style.color = currentPlayerColor;
player2.style.display = 'none';
addClicksToAll();


//check for a win on interior square
const checkInterior = intclass => {
  let intGrid = [];
  document.querySelectorAll('.' + intclass).forEach(square => {
    intGrid.push(square.id);
  })
  if (document.getElementById(intGrid[0]).classList.contains('.played') && document.getElementById(intGrid[0]).innerHTML === document.getElementById(intGrid[1]).innerHTML && document.getElementById(intGrid[0]).innerHTML === document.getElementById(intGrid[2]).innerHTML) {
    document.getElementById(intclass).innerHTML = document.getElementById(intGrid[0]).innerHTML;
    document.getElementById(intclass).classList.add('played');
  } else if (document.getElementById(intGrid[3]).classList.contains('.played') && document.getElementById(intGrid[3]).innerHTML === document.getElementById(intGrid[4]).innerHTML && document.getElementById(intGrid[3]).innerHTML === document.getElementById(intGrid[5]).innerHTML) {
    document.getElementById(intclass).innerHTML = document.getElementById(intGrid[3]).innerHTML;
    document.getElementById(intclass).classList.add('played');
  } else if (document.getElementById(intGrid[6]).classList.contains('.played') && document.getElementById(intGrid[6]).innerHTML === document.getElementById(intGrid[7]).innerHTML && document.getElementById(intGrid[6]).innerHTML === document.getElementById(intGrid[8]).innerHTML) {
    document.getElementById(intclass).innerHTML = document.getElementById(intGrid[6]).innerHTML;
    document.getElementById(intclass).classList.add('played');
  } else if (document.getElementById(intGrid[0]).classList.contains('.played') && document.getElementById(intGrid[0]).innerHTML === document.getElementById(intGrid[3]).innerHTML && document.getElementById(intGrid[0]).innerHTML === document.getElementById(intGrid[6]).innerHTML) {
    document.getElementById(intclass).innerHTML = document.getElementById(intGrid[0]).innerHTML;
    document.getElementById(intclass).classList.add('played');
  } else if (document.getElementById(intGrid[1]).classList.contains('.played') && document.getElementById(intGrid[1]).innerHTML === document.getElementById(intGrid[4]).innerHTML && document.getElementById(intGrid[1]).innerHTML === document.getElementById(intGrid[7]).innerHTML) {
    document.getElementById(intclass).innerHTML = document.getElementById(intGrid[1]).innerHTML;
    document.getElementById(intclass).classList.add('played');
  } else if (document.getElementById(intGrid[2]).classList.contains('.played') && document.getElementById(intGrid[2]).innerHTML === document.getElementById(intGrid[5]).innerHTML && document.getElementById(intGrid[2]).innerHTML === document.getElementById(intGrid[8]).innerHTML) {
    document.getElementById(intclass).innerHTML = document.getElementById(intGrid[2]).innerHTML;
    document.getElementById(intclass).classList.add('played');
  } else if (document.getElementById(intGrid[0]).classList.contains('.played') && document.getElementById(intGrid[0]).innerHTML === document.getElementById(intGrid[4]).innerHTML && document.getElementById(intGrid[0]).innerHTML === document.getElementById(intGrid[8]).innerHTML) {
    document.getElementById(intclass).innerHTML = document.getElementById(intGrid[0]).innerHTML;
    document.getElementById(intclass).classList.add('played');
  } else if (document.getElementById(intGrid[2]).classList.contains('.played') && document.getElementById(intGrid[2]).innerHTML === document.getElementById(intGrid[4]).innerHTML && document.getElementById(intGrid[2]).innerHTML === document.getElementById(intGrid[6]).innerHTML) {
    document.getElementById(intclass).innerHTML = document.getElementById(intGrid[2]).innerHTML;
    document.getElementById(intclass).classList.add('played');
  }
}

const p1Win = () => {
  player1.style.display = 'block';
  player1.style.color = winningPlayerColor;
  intro.style.color = winningPlayerColor;
  player2.style.display = 'none';
  player1text.innerHTML = 'Congratulations! You win!';
  document.body.style.backgroundImage = winningBackgroundColor;
  removeClicksFromAll();
}

const p2Win = () => {
  player1.style.display = 'none';
  player2.style.display = 'block';
  player2.style.color = winningPlayerColor;
  intro.style.color = winningPlayerColor;
  player2text.innerHTML = 'Congratulations! You win!';
  document.body.style.backgroundImage = winningBackgroundColor;
  removeClicksFromAll();
}


//check for a win on exterior squares
const checkExterior = () => {
  let extGrid = [];
  document.querySelectorAll('.exterior').forEach(square => {
    extGrid.push(square.id);
  })
  if (document.getElementById(extGrid[0]).innerHTML === document.getElementById(extGrid[1]).innerHTML && document.getElementById(extGrid[0]).innerHTML === document.getElementById(extGrid[2]).innerHTML) {
    if (document.getElementById(extGrid[0]).innerHTML === x) {
      p1Win();
    } else {
      p2Win();
    }
  } else if (document.getElementById(extGrid[3]).innerHTML === document.getElementById(extGrid[4]).innerHTML && document.getElementById(extGrid[3]).innerHTML === document.getElementById(extGrid[5]).innerHTML) {
    if (document.getElementById(extGrid[3]).innerHTML === x) {
      p1Win();
    } else {
      p2Win();
    }
  } else if (document.getElementById(extGrid[6]).innerHTML === document.getElementById(extGrid[7]).innerHTML && document.getElementById(extGrid[6]).innerHTML === document.getElementById(extGrid[8]).innerHTML) {
    if (document.getElementById(extGrid[6]).innerHTML === x) {
      p1Win();
    } else {
      p2Win();
    }
  } else if (document.getElementById(extGrid[0]).innerHTML === document.getElementById(extGrid[3]).innerHTML && document.getElementById(extGrid[0]).innerHTML === document.getElementById(extGrid[6]).innerHTML) {
    if (document.getElementById(extGrid[0]).innerHTML === x) {
      p1Win();
    } else {
      p2Win();
    }
  } else if (document.getElementById(extGrid[1]).innerHTML === document.getElementById(extGrid[4]).innerHTML && document.getElementById(extGrid[1]).innerHTML === document.getElementById(extGrid[7]).innerHTML) {
    if (document.getElementById(extGrid[1]).innerHTML === x) {
      p1Win();
    } else {
      p2Win();
    }
  } else if (document.getElementById(extGrid[2]).innerHTML === document.getElementById(extGrid[5]).innerHTML && document.getElementById(extGrid[2]).innerHTML === document.getElementById(extGrid[8]).innerHTML) {
    if (document.getElementById(extGrid[2]).innerHTML === x) {
      p1Win();
    } else {
      p2Win();
    }
  } else if (document.getElementById(extGrid[0]).innerHTML === document.getElementById(extGrid[4]).innerHTML && document.getElementById(extGrid[0]).innerHTML === document.getElementById(extGrid[8]).innerHTML) {
    if (document.getElementById(extGrid[0]).innerHTML === x) {
      p1Win();
    } else {
      p2Win();
    }
  } else if (document.getElementById(extGrid[2]).innerHTML === document.getElementById(extGrid[4]).innerHTML && document.getElementById(extGrid[2]).innerHTML === document.getElementById(extGrid[6]).innerHTML) {
    if (document.getElementById(extGrid[2]).innerHTML === x) {
      p1Win();
    } else {
      p2Win();
    }
  }
}


const removeBorders = () => {
  document.querySelectorAll('.interior').forEach(square => {
    if (square.id[4] === '1') {
      square.style.borderTopColor = '#D6EADF';
    } else if (square.id[4] === '3') {
      square.style.borderBottomColor = '#D6EADF';
    }
    
    if (square.id[3] === 'a') {
      square.style.borderLeftColor = '#D6EADF';
    } else if (square.id[3] === 'c') {
      square.style.borderRightColor = '#D6EADF';
    }
  });
}

removeBorders();

instructText.style.display = 'block';

const toggleInstruct = () => {
  if (showHide.innerHTML === '(Click to Hide)') {
    showHide.innerHTML = '(Click to Show)';
  } else {
    showHide.innerHTML = '(Click to Hide)';
  }
  
  if (instructText.style.display === 'block') {
    instructText.style.display = 'none';
  } else {
    instructText.style.display = 'block';
  }
}

instructions.addEventListener('click', toggleInstruct);
