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

#### Game notes

- Ships placed by the computer don't overlap and stay within the board bounds.
- Only one-sided gameplay (player vs computer, no computer shots).

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

## Features

### 🖥️ User Experience

- Mobile-first responsive design
- Keyboard-friendly controls, screen reader support
- Basic input validation
- Automatically ends the game when all ships are destroyed
- Clean and minimal UI

### 🛠️ Developer Experience

- 😆 Cheat mode (view ship locations in console)
- TypeScript for type safety
- Modular component architecture
- ESLint configuration

#### 🔖 Code Quality

The code adheres to the following quality standards:

- Readability & Structure:

  - Clear component/module separation (components/, utils/).
  - Semantic HTML with accessibility checks (no violations).
  - No unused variables, debug logs, or TypeScript errors.

- Maintainability:

  - TypeScript for type safety.
  - Comments for more clarity.
  - Consistent naming conventions (PascalCase for components, camelCase for utils).

- Accessibility:
  - Proper use of semantic HTML and ARIA attributes where needed.
  - Automated testing with axeDevTools confirmed zero violations.
  - The game is fully playable with screen readers and keyboard navigation.

#### 🌐 Accessibility

The game is designed to be accessible to all users. Specifically these are the key features:

- The correct usage of landmarks and headings allow screen reader users to find relevant sections easily (Ships info, Game board, Input form).
- The battleground is built as a semantic HTML table -> this allows screen reader users to navigate the game easily.
- Each cell in the grid has an `sr-only` attribute that describes its state (hit, miss, or untargeted) for screen readers. This provides the same feedback as visual indicators.
- Each cell announces coordinates and state (e.g., "B3, Hit").
- High contrast color scheme was used for clear visibility
- Large, legible text throughout the interface adapts to all breakpoints.

#### 🔮 Future Improvements

Had I had additional time, I would prioritize:

- Unit tests

- Better error handling for invalid inputs

- Immediate feedback for user-entered coordinates via live regions

- Improved UI

- Deployment to github pages

- Improved SEO score on Lighthouse
