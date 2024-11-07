document.addEventListener('DOMContentLoaded', () => {
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const player1Timer = document.getElementById('player1-timer');
  const player2Timer = document.getElementById('player2-timer');
  const countdownPopup = document.getElementById('countdown-popup');
  const countdownTimer = document.getElementById('countdown-timer');
  const remainingTimeDisplay = document.getElementById('remaining-time');
  const player1LivesDisplay = document.getElementById('player1-lives');
  const player2LivesDisplay = document.getElementById('player2-lives');
  const endGamePopup = document.getElementById('end-game-popup');
  const player1EndTime = document.getElementById('player1-end-time');
  const player2EndTime = document.getElementById('player2-end-time');
  const winnerMessage = document.getElementById('winner-message');
  const playAgainEndButton = document.getElementById('play-again-end-button');
  const defeatPopup = document.getElementById('defeat-popup');

  let player1BlackTime = 0;
  let player2BlackTime = 0;
  let player1Interval, player2Interval;
  let remainingTime = gameDuration; // Use the game duration from the session
  let player1Lives = 3;
  let player2Lives = 3;
  let gameOver = false;
  let remainingTimeInterval;

  const updateLivesDisplay = () => {
    player1LivesDisplay.innerHTML = '';
    player2LivesDisplay.innerHTML = '';

    for (let i = 0; i < player1Lives; i++) {
      const heart = document.createElement('span');
      heart.classList.add('heart');
      heart.innerHTML = '&#10084;';
      player1LivesDisplay.appendChild(heart);
    }

    for (let i = 0; i < player2Lives; i++) {
      const heart = document.createElement('span');
      heart.classList.add('heart');
      heart.innerHTML = '&#10084;';
      player2LivesDisplay.appendChild(heart);
    }
  };

  const switchToBlack = (player) => {
    player.style.backgroundColor = 'black';
    if (player === player1) {
      player1Interval = setInterval(() => {
        player1BlackTime += 0.01;
        player1Timer.textContent = player1BlackTime.toFixed(2);
      }, 10);
    } else {
      player2Interval = setInterval(() => {
        player2BlackTime += 0.01;
        player2Timer.textContent = player2BlackTime.toFixed(2);
      }, 10);
    }
  };

  const switchToColor = (player, color) => {
    player.style.backgroundColor = color;
    if (player === player1) {
      clearInterval(player1Interval);
    } else {
      clearInterval(player2Interval);
    }
  };

  const handleKeyPress = (event) => {
    if (gameOver) return;

    console.log("Key pressed:", event.key);

    if (event.key === 'q' && player1.style.backgroundColor === 'black') {
      console.log("Player 1 pressed Q when black");
      switchToColor(player1, 'red');
      switchToBlack(player2);
    } else if (event.key === 'm' && player2.style.backgroundColor === 'black') {
      console.log("Player 2 pressed M when black");
      switchToColor(player2, 'green');
      switchToBlack(player1);
    } else if (event.key === 'q' && player1.style.backgroundColor !== 'black') {
      console.log("Player 1 pressed Q at the wrong time");
      player1Lives--;
      updateLivesDisplay();
      if (player1Lives === 0) {
        endGame('Player 1 Defeated');
      } else {
        alert('Player 1 pressed Q at the wrong time! Lost a life.');
      }
    } else if (event.key === 'm' && player2.style.backgroundColor !== 'black') {
      console.log("Player 2 pressed M at the wrong time");
      player2Lives--;
      updateLivesDisplay();
      if (player2Lives === 0) {
        endGame('Player 2 Defeated');
      } else {
        alert('Player 2 pressed M at the wrong time! Lost a life.');
      }
    }
  };

  const endGame = (message) => {
    console.log("endGame called with message:", message);
    console.log("Player 1 black time:", player1BlackTime.toFixed(2));
    console.log("Player 2 black time:", player2BlackTime.toFixed(2));

    defeatPopup.style.display = 'none';

    player1EndTime.textContent = `${player1BlackTime.toFixed(2)} sec`;
    player2EndTime.textContent = `${player2BlackTime.toFixed(2)} sec`;
    const winner = player1BlackTime < player2BlackTime ? 'Player 1 Wins!' : player1BlackTime > player2BlackTime ? 'Player 2 Wins!' : 'It\'s a Tie!';

    winnerMessage.textContent = message || winner;

    console.log("Displaying end game popup");

    endGamePopup.style.display = 'flex';
    gameOver = true;
    document.removeEventListener('keydown', handleKeyPress);
    clearInterval(player1Interval);
    clearInterval(player2Interval);
    clearInterval(remainingTimeInterval);

    console.log("End game popup displayed");
  };

  const resetGame = () => {
    clearInterval(player1Interval);
    clearInterval(player2Interval);
    clearInterval(remainingTimeInterval);
    player1.style.backgroundColor = 'red';
    player2.style.backgroundColor = 'green';
    player1BlackTime = 0;
    player2BlackTime = 0;
    remainingTime = gameDuration;
    player1Lives = 3;
    player2Lives = 3;
    gameOver = false;
    player1Timer.textContent = player1BlackTime.toFixed(2);
    player2Timer.textContent = player2BlackTime.toFixed(2);
    remainingTimeDisplay.textContent = remainingTime.toFixed(2);
    updateLivesDisplay();
    endGamePopup.style.display = 'none';
  };

  const startGame = () => {
    document.addEventListener('keydown', handleKeyPress);
    randomlyTurnOneRectangleBlack();
    startRemainingTimeCountdown();
  };

  const randomlyTurnOneRectangleBlack = () => {
    const randomChoice = Math.random() < 0.5 ? player1 : player2;
    switchToBlack(randomChoice);
  };

  const startCountdown = () => {
    let countdown = 3;
    countdownTimer.textContent = countdown;
    countdownPopup.style.display = 'flex';
    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownTimer.textContent = countdown;
      } else {
        clearInterval(countdownInterval);
        countdownPopup.style.display = 'none';
        startGame();
      }
    }, 1000);
  };

  const startRemainingTimeCountdown = () => {
    remainingTimeInterval = setInterval(() => {
      if (gameOver) {
        clearInterval(remainingTimeInterval);
        console.log("Game over detected, clearing remainingTimeInterval.");
        return;
      }
      remainingTime -= 0.01;
      remainingTimeDisplay.textContent = remainingTime.toFixed(2);
      console.log("Remaining time:", remainingTime.toFixed(2));
      if (remainingTime <= 0) {
        clearInterval(remainingTimeInterval);
        document.removeEventListener('keydown', handleKeyPress);
        console.log("Time is up! Ending game.");
        endGame('Time is up!');
      }
    }, 10);
  };

  playAgainEndButton.addEventListener('click', () => {
    resetGame();
    window.location.href = '/';
  });

  countdownPopup.style.display = 'flex';
  startCountdown();
});