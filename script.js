const overlayText = document.querySelector('.overlay-text')
const timer = document.querySelector("#timer")
const endGameModal = document.querySelector("#end-game-modal")
const replayBtn = document.querySelector("#replay-btn")

const getReady = () => {
    overlayText.classList.add('visible');
    overlayText.addEventListener('click', () => {
        overlayText.classList.remove('visible');
        startGame(100);
    })
}

const startGame = (totalTime) => {
    timer.innerText = totalTime;
  let timeRemaining = totalTime;
  const timerId = setInterval(() => {
    timeRemaining--;
    timer.innerText = timeRemaining;
    if(timeRemaining === 0) {
        gameOver()
        clearInterval(timerId)
    }
  }, 1000)
}

const gameOver = () =>{
  endGameModal.classList.add('visible')
  replayBtn.addEventListener("click", () => {
      window.location.reload()
  })
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', getReady());
} else {
    getReady();
}
