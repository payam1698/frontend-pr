# Ravankargah - Psychology Education Institute Website

## Overview
A React + TypeScript + Vite frontend application for a Persian (Farsi) psychology education institute. The website is displayed right-to-left (RTL) and uses the Vazirmatn Persian font.

## Project Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (CDN-based)
- **Routing**: React Router DOM 6.x
- **Icons**: Lucide React

## Directory Structure
```
├── components/       # Reusable UI components
├── context/          # React context providers (Auth, Comments, Courses)
├── data/             # Mock data files
├── pages/            # Page components
├── utils/            # Utility functions
├── App.tsx           # Main app component with routing
├── index.html        # HTML entry point
├── index.tsx         # React entry point
├── types.ts          # TypeScript type definitions
└── vite.config.ts    # Vite configuration
```

## Development
- **Port**: 5000
- **Command**: `npm run dev`
- The Vite dev server is configured to allow all hosts for Replit's proxy environment.

## Deployment
- **Type**: Autoscale
- **Build**: `npm run build`
- **Run**: `npm run preview` on port 5000

## Environment Variables
- `GEMINI_API_KEY` - Optional, used for AI chatbot functionality

## Recent Changes
- December 25, 2025: Initial import and Replit environment setup
  - Fixed React/React-DOM version mismatch (aligned to 18.2.0)
  - Configured Vite for port 5000 with allowedHosts: true
  - Set up development workflow and deployment configuration
