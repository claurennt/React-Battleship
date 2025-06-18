# React Battleship 🎯🚢

This is a simple implementation of the classic **Battleship** game built with **React** as part of a recruitment technical assignment.

## Game Description 🎮

You play against the computer on a 10x10 grid. The goal is to sink all of the computer’s ships.

### Ships 🛳️

- 1 × Battleship (5 cells)
- 2 × Destroyers (4 cells each)

The computer places the ships randomly. Enter coordinates like `A5` or `J10` to fire at a location. You’ll see:

- Hits marked clearly on the grid
- Misses marked with an `X`
- The game ends when all ships are sunk

## Features

- Fully responsive and accessible
- Clear visual feedback for hits and misses
- Basic input validation
- Automatically ends the game when all ships are destroyed
- Clean and minimal UI
- 😆 Cheat Mode: look at your browser console

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/claurennt/React-Battleship.git
cd React-Battleship

# Install dependencies
npm install

# Run the app in dev mode
npm run dev

# Served at http://localhost:5173

# or build the app and open a preview
npm run build

npm run preview

# Served at http://localhost:4173
```

#### How It Works

- The computer randomly places ships on the board at the start.
- The player enters coordinates in a text input.
- The grid updates based on hits or misses.
- A victory message appears when all ships are sunk.

##### Notes

- Ships cannot overlap and stay within the board bounds.
- Only one-sided gameplay (player vs computer, no computer shots).
