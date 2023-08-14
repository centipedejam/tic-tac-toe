/*----- constants -----*/
const IMG_LOOKUP = {
    "1": 'X',
    "-1": 'O',
    "0": ''
  }
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  /*----- state variables -----*/
  let board; // 
  let winner;
  let turn;
  
  
  /*----- cached elements  -----*/
  const messageEl = document.getElementById('message');
  const resetBtn = document.querySelector('button');
  const cellEls = [...document.querySelectorAll('#board > div')];
  const headerEl = document.querySelector('header')
  
  /*----- event listeners -----*/
  resetBtn.addEventListener('click', init);
  document.getElementById('board').addEventListener('click', handleCellSelect);
  
  /*----- functions -----*/
  init();
  
  function init() {
    board = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];
    turn = 1;
    winner = 0;
    render();
  }
  
  // checks to see if the absolute sum of any of the winning combos arrays = 3
  function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
      if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] +
        board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
    }
    if (board.includes(0)) return 0; //board still has spaces continue playing
    return 'T'; //or return tie
  }
  
  
  function handleCellSelect(evt) {
    const cellIdx = cellEls.indexOf(evt.target);
    if (cellIdx === -1 || winner) return; //Guards (if index of target is -1 or winner return)
    if (board[cellIdx] === 0) { //if space is empty, clicked space = player value, change turn, check for winner
      board[cellIdx] = turn;
      turn *= -1;
      winner = getWinner();
      render();
    }
  }
  
  function render() {
    renderBoard();
    renderMessage();
    renderControls();
  }
  
  function renderBoard() {
    board.forEach(function(cellVal, Idx) {
      const cellEl = document.getElementById(Idx);
      headerEl.innerHTML = 'TIC TAC TOE';
      headerEl.style.color = '#F24C3D';
      cellEl.textContent = IMG_LOOKUP[cellVal];
      cellVal === 1 ? cellEl.style.color = '#F2BE22' : cellEl.style.color = '#22A699';
      if (cellVal) {
        cellEl.classList.remove('pointer'); //remove class||add class for cursor type depending if cell has value
        cellEl.classList.add('not-allowed');
      } else {
        cellEl.classList.add('pointer');
        cellEl.classList.remove('not-allowed');
      }
      if (winner) cellEl.classList.add('not-allowed');
    })
  }
  
  function renderMessage() {
    if (winner === 'T') {
      messageEl.style.color = '#E8F6EF';
      messageEl.innerHTML = "It's a Tie!";
    } else if (winner) {
      messageEl.innerHTML = `${IMG_LOOKUP[winner]} wins!'`
    } else {
      messageEl.innerHTML = `${IMG_LOOKUP[turn]}'s turn!'`
      turn === 1 ? messageEl.style.color = '#F2BE22' : messageEl.style.color = '#22A699';
    }
  }
  
  function renderControls() {
    resetBtn.style.visibility = winner ? 'visible' : 'hidden';
  }