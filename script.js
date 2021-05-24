const overlay = document.querySelector(".overlay-text");
const timer = document.querySelector("#timer")
const endGameModal = document.querySelector(".end-game-modal")
const replayBtn = document.querySelector('.replay-btn')
const cards = document.querySelectorAll(".card")
const cardDeck = document.querySelector('.game-container')

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
            gameOver()
        }
}, 1000)
}

//function to play the flip sound
const playFlipSound = () =>{
    const audio = new Audio('assets/sounds/flip.wav');
    audio.play()
}

//to flip the card
const flipCard = (item) => {
   item.classList.add('visible')
}

// Fisher-Yates (aka Knuth) Shuffle
const shuffleArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let rand = Math.floor(Math.random() * arr.length);
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
}

//when the game ends
const gameOver = ()=>{
endGameModal.classList.add('visible');
}

ready();


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
    })
})

