# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nibble is a recipe-sharing app built around vertical video. Users film themselves cooking, and the app auto-generates written recipes from videos to build a personal cookbook.

## Development Commands

```bash
npm install          # Install dependencies
npm run start        # Start Expo dev server (or: npx expo start)
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm run web          # Run in web browser
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run format:check # Check formatting without modifying
```

## Tech Stack

- **Expo 54** with React Native 0.81 and React 19
- **Expo Router** for file-based routing
- **TypeScript** with strict mode enabled
- React Native New Architecture and React Compiler enabled
- Typed routes experiment enabled

## Architecture

### Directory Structure

- `/app` - Expo Router screens and layouts (file-based routing)
  - `/(tabs)` - Tab navigation group (home, profile)
  - `/features` - Feature-specific screens
  - `_layout.tsx` files define navigation structure at each level
- `/components` - Reusable React components
  - `/ui` - UI primitives (buttons, icons)
- `/hooks` - Custom React hooks (theming, color scheme)
- `/constants` - App constants including theme colors
- `/services` - Business logic and data fetching
- `/data` - Mock data and fixtures

### Routing Conventions

- File-based routing with Expo Router (similar to Next.js)
- Folder groups use parentheses: `(tabs)` for grouping without affecting URL
- `_layout.tsx` files configure navigation at each directory level

### Theming

Colors defined in `constants/theme.ts`:

- Primary: teal (#177e89)
- Accent: toasted almond (#d4835c)
- Background: soft linen (#f5f1e8)
- Text: stormy teal (#08605f)

Platform-specific fonts configured via `Platform.select()`.

## Code Quality

- **Conventional commits** enforced via commitlint (feat:, fix:, refactor:, etc.)
- **Pre-commit hooks** run lint-staged via Husky
- **Prettier** as default formatter with ESLint integration
- Version releases managed with `npm run release` (generates changelog)

## Platform Support

- iOS (with tablet support)
- Android (edge-to-edge enabled, adaptive icons)
- Web (static output)
