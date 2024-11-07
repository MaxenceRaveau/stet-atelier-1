# The Counter Game

The Counter Game is a web application where two players compete to keep their assigned color (Red or Green) from turning black as much as possible. The player with the least time in black wins. The game is implemented using Node.js with the Express framework, MongoDB with Mongoose ORM, EJS view engine, Bootstrap for styling, and vanilla JavaScript for the frontend.

## Overview

The Counter Game is built with a clear separation of concerns between the frontend and backend. The backend, powered by Node.js and Express, handles game logic, state management, and serves the frontend pages. MongoDB with Mongoose ORM is used for database operations. The frontend uses EJS templates for rendering views, Bootstrap for responsive design, and vanilla JavaScript for game interactions.

### Architecture

- **Backend**: Node.js with Express framework
- **Database**: MongoDB with Mongoose ORM
- **Frontend**: EJS view engine, Bootstrap for styling, vanilla JavaScript for game logic

### Project Structure

- **Backend**:
  - `server.js`: Main entry point for the server
  - `routes/`: Directory containing route definitions
  - `models/`: Directory containing Mongoose models
  - `services/`: Directory containing service files
  - `middleware/`: Directory containing middleware functions
- **Frontend**:
  - `views/`: Directory containing EJS templates
  - `public/css/`: Directory containing CSS files
  - `public/js/`: Directory containing JavaScript files

## Features

- **Welcome Screen**: 
  - Allows players to select game duration (15s, 30s, 1 min) and start the game.
- **Rules Display**:
  - Shows game rules and a countdown before the game starts.
- **Game Layout**:
  - Screen is divided into two rectangles (Red for Player 1, Green for Player 2).
  - Players press specific keys (Q for Player 1, M for Player 2) to switch the black color to their opponent's side.
  - The game tracks the time each player's rectangle remains black.
- **Game Over Condition**:
  - Players have 3 lives. Pressing the key at the wrong time results in losing a life.
  - Game ends if a player loses all lives or the timer runs out.
- **End Game Screen**:
  - Displays the total time each player spent with their rectangle black and indicates the winner.
  - Provides an option to play again.

## Getting Started

### Requirements

- Node.js

### Quickstart

1. **Clone the repository**:
    ```sh
    git clone <repository_url>
    cd the-counter-game
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the server**:
    ```sh
    npm start
    ```

4. **Access the game**:
    - Open your web browser and go to `http://localhost:3000`

### License

The project is proprietary (not open source). Copyright (c) 2024.
