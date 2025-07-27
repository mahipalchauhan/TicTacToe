let music = new Audio("music.wav");
let audioturn = new Audio("turn.mp3");
let audiogameover = new Audio("gameover.mp3");
let turn = "X";
let gameover = false;

// Change the turn
const changeTurn = () => turn === "X" ? "O" : "X";

// Winning logic
const checkwin = () => {
  let boxtext = document.getElementsByClassName('boxtext');
let wins = [
  [0,1,2,50,60,0],     // Top row
  [3,4,5,50,160,0],    // Middle row
  [6,7,8,50,260,0],    // Bottom row

  [0,3,6,60,150,90],   // Left column
  [1,4,7,160,150,90],  // Middle column
  [2,5,8,260,150,90],  // Right column

  [0,4,8,50,150,45],   // TL to BR diagonal
  [2,4,6,50,150,135],  // TR to BL diagonal
];

  wins.forEach(e => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector('.info').innerText = boxtext[e[0]].innerText + " won";
      document.getElementById("winnerText").innerText = boxtext[e[0]].innerText + " Wins!";
      gameover = true;

      // Show line
      document.querySelector(".line").style.transform = 
        `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "30vw";

      // Animate trophy
      let trophy = document.querySelector('.imgbox img');
      trophy.classList.add("animate");

      // Highlight winning boxes
      boxtext[e[0]].parentElement.style.backgroundColor = "#b2ebf2";
      boxtext[e[1]].parentElement.style.backgroundColor = "#b2ebf2";
      boxtext[e[2]].parentElement.style.backgroundColor = "#b2ebf2";
    }
  });
};

const isDraw = () => {
  let allFilled = Array.from(document.getElementsByClassName('boxtext')).every(
    b => b.innerText !== ''
  );
  if (allFilled && !gameover) {
    document.querySelector('.info').innerText = "It's a draw!";
    document.getElementById("winnerText").innerText = "Draw!";
    gameover = true;
  }
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click', () => {
    if (boxtext.innerText === '' && !gameover) {
      boxtext.innerText = turn;
      audioturn.play();
      checkwin();
      isDraw();
      if (!gameover) {
        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

// Reset logic
document.getElementById("reset").addEventListener("click", () => {
  let boxtexts = document.querySelectorAll('.boxtext');
  boxtexts.forEach(element => element.innerText = "");
  turn = "X";
  gameover = false;
  document.querySelector(".info").innerText = "Turn for " + turn;
  
  const line = document.querySelector(".line");
  line.style.width = "0";
  line.style.transform = "translate(0, 0) rotate(0deg)";


  document.getElementById("winnerText").innerText = "";
  let trophy = document.querySelector('.imgbox img');
  trophy.classList.remove("animate");
  trophy.style.width = "0px";

  document.querySelectorAll(".box").forEach(box => {
    box.style.backgroundColor = "";
  });
});
