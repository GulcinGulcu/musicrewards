# MusicRewards

A **React Native (Expo)** app that lets users **earn points by listening to music**.  
Built with **TypeScript**, **Zustand**, and **React Native Track Player (RNTP)**.

## Features

-  **Music Rewards** — Listen to a track from start to finish to earn points  
-  **Confetti Celebration** — A fun modal appears when music ends (e.g., “Congratulations! You earned 150 points!”)  
-  **Light & Dark Mode** support  
-  **Persistent State** with Zustand + AsyncStorage (for user, music, and theme data)  
-  **Home Screen** — Displays challenge cards  
-  **Profile Screen** — Shows user information  
-  **Settings Screen** — Includes developer tools to clear or log persistent storage  

## Installation

```bash
# Clone the repository
git clone https://github.com/GulcinGulcu/musicrewards
cd musicrewards

# Install dependencies
npm install
# or
yarn

# Android
npx expo run:android

# iOS (macOS only)
npx expo run:ios


#Project Structure

.
├── assets/         # Images, fonts, icons
├── src/            # Application source code
│   ├── app/          # App entry and navigation setup
│   ├── components/   # Reusable UI components
│   ├── constants/    # App-wide constants (colors, sizes, etc.)
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API and async services
│   ├── stores/       # Zustand stores (user, music, theme)
│   ├── types/        # TypeScript types and interfaces
│   └── utils/        # Helper and utility functions
├── app.js          # Entry point (Expo)
├── app.json        # Expo configuration
├── tsconfig.json   # TypeScript configuration
└── package.json    # Scripts and dependencies




