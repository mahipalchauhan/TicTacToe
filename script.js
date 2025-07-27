console.log("welcome to tik tac toe")
let music = new Audio("music.wav")
let audioturn = new Audio("turn.mp3")
let audiogameover = new Audio("gameover.mp3")
let turn = "X"
let gameover=false;
//change the turn
changeTurn=()=>{

    return turn==="X"? "0" : "X"
}

//function to chect win

const checkwin = ()=>{
 let boxtext=document.getElementsByClassName('boxtext');
    let wins = [
    [0,1,2,5,5,0],
    [3,4,5,5,5,15],
    [6,7,8,5,25,0],
    [0,3,6,-5,15,90],
    [1,4,7,5,5,90],
    [2,5,8,15,15,90],
    [0,4,8,5,15,45],
    [2,4,6,5,15,135],
    ]

 wins.forEach(e =>{
  if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "" )){
    document.querySelector('.info').innerText= boxtext[e[0]].innerText+"won"
    gameover=true
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="80px";
   document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
    document.querySelector(".line").style.width= "22vw";
  }

 });
}



// logic of game
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext=element.querySelector('.boxtext')
    element.addEventListener('click',()=>{
   if(boxtext.innerHTML === ''){
     boxtext.innerText= turn;
     turn=changeTurn();
     audioturn.play();
     checkwin();
     if(!gameover){
     document.getElementsByClassName("info")[0].innerText="turn for"+turn;
     }
 
    }
    });
});

// reset logic
reset.addEventListener('click',()=>{
let boxtexts=document.querySelectorAll('.boxtext');
  Array.from(boxtexts).forEach(element => {
    element.innerText = ""
  });
  turn="X"
  gameover=false;
  document.querySelector(".line").style.width= "0";
    document.getElementsByClassName("info")[0].innerText="turn for "+turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="0px"
})
