document.addEventListener('DOMContentLoaded', () => {
  const durationButtons = document.querySelectorAll('.btn-group .btn');
  const playButton = document.getElementById('play-button');
  let selectedDuration = null;

  durationButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove highlight from all buttons
      durationButtons.forEach(btn => btn.classList.remove('btn-primary'));
      durationButtons.forEach(btn => btn.classList.add('btn-outline-primary'));

      // Highlight the clicked button
      button.classList.remove('btn-outline-primary');
      button.classList.add('btn-primary');

      // Store the selected duration
      selectedDuration = button.id.split('-')[1]; // Extract duration value from button id (e.g., "15" from "duration-15")
    });
  });

  playButton.addEventListener('click', () => {
    if (!selectedDuration) {
      alert('Please select a game duration.');
      return;
    }

    // Send the selected duration to the backend
    fetch('/start-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ duration: selectedDuration }),
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/rules';
      } else {
        alert('Failed to start the game. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  });
});