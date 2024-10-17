const X_Class='x';
const circle_Class='circle';
const WINNING_COMBINATIONS=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]

]
const cellElements=document.querySelectorAll('[data-cell]');
const board=document.getElementById("board")
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
const winningMessageElement=document.getElementById('winningMessage')
const restartButton=document.getElementById("restartButton")
let circleTurn ;

startGame();
restartButton.addEventListener('click',startGame);


function startGame(){
  circleTurn=false;
  cellElements.forEach(cell=> {
    cell.classList.remove(X_Class);
    cell.classList.remove(circle_Class);
    cell.removeEventListener("click",handleClick)
    cell.addEventListener('click',handleClick,{once:true})
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove("show");
}


function handleClick(e){

  const cell=e.target;
  const currentClass=circleTurn ? circle_Class : X_Class ; 

  //place the mark
  placeMark(cell,currentClass)
  //check win 
  if (checkWin(currentClass)){
    endGame(false)
  } else if (isDraw()){
    endGame(true);
  } else {
    //swap board
    swapTurn();
    setBoardHoverClass();

  }  
}

function placeMark(cell,currentClass){ 
  cell.classList.add(currentClass);
}

function swapTurn(){
  circleTurn=!circleTurn;
}

function setBoardHoverClass(){
  board.classList.remove(X_Class);
  board.classList.remove(circle_Class);
  if (circleTurn){
    board.classList.add(circle_Class);
  }else{
    board.classList.add(X_Class)
  }
}

function checkWin(currentClass){
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index=>{
      return cellElements[index].classList.contains(currentClass)
    })
  })
}


function endGame(draw){
  if (draw){
    winningMessageTextElement.innerHTML="Draw!"
  } else {
    winningMessageTextElement.innerHTML=`${circleTurn ? "O's" : "X's" } Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw(){
  return [...cellElements].every(cell=>{
    return cell.classList.contains(X_Class) || cell.classList.contains(circle_Class)
  })}