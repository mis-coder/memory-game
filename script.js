const overlay = document.querySelector(".overlay-text");
const timer = document.querySelector("#timer")
const score = document.querySelector("#score")
const endGameModal = document.querySelector(".end-game-modal")
const replayBtn = document.querySelector('.replay-btn')
const cards = document.querySelectorAll(".card")
const cardDeck = document.querySelector('.game-container')

let visibleCards = [];
let scores = 0;

//this function is called after loading of the page
const ready = () =>{
    overlay.classList.add('visible');
    const shuffledCards = shuffleArray( Array.from(cards) );
    shuffledCards.forEach(card => cardDeck.appendChild(card) )
}

//for starting the game 
const startGame = (totalTime) => {
    const timerId = setInterval(() => {            
        totalTime = totalTime - 1
        timer.innerText = totalTime
        if(totalTime === 0){
            clearInterval(timerId);
            gameLost()
        }
        else if(totalTime > 0 && (scores === cards.length / 2)){
            clearInterval(timerId);
            gameWon();
        }
}, 1000)
}

//function to play the flip sound
const playFlipSound = () =>{
    const audio = new Audio('assets/sounds/flip.wav');
    audio.play()
}

//function to play matched sound
const playMatchSound = () =>{
    const audio = new Audio('assets/sounds/match.wav');
    audio.play()
}

//to flip the card
const flipCard = (item) => {
   item.classList.add('visible');
}

//to check matched or unmatched
const matchedOrUnmatched = (item)=>{
   visibleCards.push(item);
   let len = visibleCards.length;
   if(len === 2){
       if(visibleCards[0].querySelector('.card-front img').src === visibleCards[1].querySelector('.card-front img').src){
           cardsMatched();
       }
       else{
           cardsUnmatched();
       }
   }
}

//when the two cards are matched
const cardsMatched = ()=>{
    visibleCards[0].classList.add('matched');
    visibleCards[1].classList.add('matched');
    visibleCards = [];
    setTimeout(() => { 
        playMatchSound();    
        countScores();
    }, 500);
}

//when the two cards are not matched
const cardsUnmatched = () =>{
    setTimeout(()=>{
        visibleCards[0].classList.remove('visible');
        visibleCards[1].classList.remove('visible');
        visibleCards = [];
    }, 500);
}

// Fisher-Yates (aka Knuth) Shuffle
const shuffleArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let rand = Math.floor(Math.random() * arr.length);
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
}

//to count the scores
const countScores = () =>{
    scores++;
    score.innerText = scores;
}

//when the game is lost
const gameLost= ()=>{
endGameModal.classList.add('visible');
}

//when the game is won
const gameWon = ()=>{
   endGameModal.querySelector('p').innerText = 'You Won'
   endGameModal.classList.add('visible');
}


/*--------------- EVENT LISTENERS ---------------------------*/

overlay.addEventListener('click', () => {
    overlay.classList.remove('visible');
    startGame(100)
})

replayBtn.addEventListener('click', ()=>{
    window.location.reload()
})

cards.forEach((card) => {
    card.addEventListener('click',() =>{
        playFlipSound();
        flipCard(card);
        matchedOrUnmatched(card);
    })
})

//first make sure if the content on DOM is loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}