document.addEventListener('DOMContentLoaded', () => {
  let countdownTimer = 10;
  const countdownElement = document.getElementById('countdown-timer');

  const countdownInterval = setInterval(() => {
    countdownTimer--;
    countdownElement.textContent = countdownTimer;

    if (countdownTimer <= 0) {
      clearInterval(countdownInterval);
      window.location.href = '/game'; // Redirect to the game screen
    }
  }, 1000);
});