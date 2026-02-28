<div align="center">

<!-- logo goes here -->

<img src="/Users/evanscott/source/nibble/apps/mobile/assets/images/readme-header.svg" alt="nibble — Cook it. Film it. Share it." width="400" />

<br/>

_A video-first recipe sharing platform — vertical feed, AI-powered recipe generation, and a clean social experience for chefs at every level._

<br/>

![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-CE422B?style=flat-square&logo=rust&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Nx](https://img.shields.io/badge/Nx-143055?style=flat-square&logo=nx&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_R2-F38020?style=flat-square&logo=cloudflare&logoColor=white)

<br/>

</div>

---

## Overview

RecipeReel is a mobile-first platform combining TikTok-style vertical video with structured recipe data. Users upload cooking videos, attach recipes manually or let AI generate them from the video content, and discover content through an algorithm-driven vertical feed.

The architecture is designed as a domain-driven monorepo — clear bounded contexts, independent scalability per service, and a provider-agnostic AI layer that swaps between local LLMs and cloud providers without changing application code.

---

## Monorepo Structure

```
recipereel/
├── apps/
│   ├── mobile/              # Expo React Native (iOS + Android)
│   └── api/                 # Go API server (Gin/Chi)
├── services/
│   └── video-processor/     # Rust — async transcoding & thumbnails
├── packages/
│   └── api-types/           # Shared TypeScript contracts
├── infra/
│   ├── docker/              # Per-service Dockerfiles
│   ├── compose/             # docker-compose for local dev
│   └── migrations/          # PostgreSQL migrations (goose)
├── docs/
│   └── adr/                 # Architecture Decision Records
├── scripts/                 # Dev utilities
└── .github/workflows/       # Path-filtered CI per service
```

---

## Architecture

<div align="center">

```
┌─────────────────────────────────────────────────────────────────┐
│                        Mobile App (Expo)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST / JSON
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Go API Server                           │
│                                                                 │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│   │ auth-service │  │recipe-service│  │    feed-service       │ │
│   └──────────────┘  └──────┬───────┘  └──────────────────────┘ │
│                            │ strategy pattern                   │
│                     ┌──────▼───────┐                           │
│                     │ AI Provider  │ local · openai · anthropic │
│                     └──────────────┘                           │
└────────────┬──────────────────────────────────────────────────-─┘
             │                                    │ enqueue job
      read/write                                  ▼
             │                    ┌───────────────────────────────┐
             ▼                    │    Rust Video Processor        │
      ┌─────────────┐             │   transcode · thumbnail · norm │
      │ PostgreSQL  │             └───────────────┬───────────────┘
      └─────────────┘                             │ write
                                                  ▼
                                    ┌─────────────────────────┐
                                    │     Cloudflare R2        │
                                    │   video · thumbnails     │
                                    └─────────────────────────┘
                                              ▲
                              pre-signed URL  │
                        Mobile streams directly (no proxy)
```

</div>

### Domain Boundaries

| Domain                | Responsibility                                    | Service          |
| --------------------- | ------------------------------------------------- | ---------------- |
| **Identity & Access** | Auth, sessions, JWT issuance, profiles            | `auth-service`   |
| **Content (Video)**   | Upload, storage refs, metadata, playback URLs     | `video-service`  |
| **Recipe**            | Ingredients, steps, metadata — AI or manual       | `recipe-service` |
| **Feed & Discovery**  | Ranking, recommendations, engagement tracking     | `feed-service`   |
| **AI Orchestration**  | Provider-agnostic generation via strategy pattern | Shared lib       |

> Video owns the `recipe_id` foreign key (nullable). Recipe has no reference to Video. This keeps both domains independently testable and scalable.

---

## Tech Stack

| Layer            | Technology             | Why                                                       |
| ---------------- | ---------------------- | --------------------------------------------------------- |
| Mobile           | Expo React Native      | iOS + Android from one codebase                           |
| API Server       | Go (Gin or Chi)        | Productive, great concurrency, mature ecosystem           |
| Video Processing | Rust + Tokio + FFmpeg  | Raw performance where it counts — transcoding, thumbnails |
| Database         | PostgreSQL             | Neon or Railway for MVP                                   |
| Object Storage   | Cloudflare R2          | Zero egress fees vs S3 — significant at video scale       |
| Monorepo         | Nx                     | Dependency graph, path-filtered CI, shared packages       |
| Auth             | JWT (issued by Go API) | Provider credentials never leave the server               |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Go 1.23+
- Rust (stable)
- Docker + Docker Compose
- Expo CLI (`npm install -g expo-cli`)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Fill in your values
```

### 3. Start local infrastructure

```bash
docker compose -f infra/compose/docker-compose.yml up -d postgres
```

### 4. Run the mobile app

```bash
# Start the Expo dev server
nx start mobile

# iOS simulator (separate terminal)
nx run mobile:run-ios

# Android emulator (separate terminal)
nx run mobile:run-android
```

### 5. Run the API server

```bash
cd apps/api && go run ./cmd/server
```

---

## Development

### Nx commands

```bash
# Start mobile dev server
nx start mobile

# Build shared types package
nx build api-types

# Typecheck everything
nx run-many --target=typecheck --all

# Visualize the project dependency graph
nx graph
```

### Running all services locally

```bash
docker compose -f infra/compose/docker-compose.yml up
```

---

## Project Conventions

**Commits** follow [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, `docs:`, etc.

**Branches** use `feature/`, `fix/`, `chore/` prefixes off `main`.

**Architecture decisions** are documented as ADRs in `docs/adr/`. If you're making a significant technical decision, write one.

**CI is path-filtered** — changes to `apps/mobile/` only trigger the mobile workflow. Changes to `apps/api/` only trigger the API workflow. This keeps CI fast regardless of repo size.

---

## Roadmap

- [x] Architecture planning & domain design
- [x] Nx monorepo migration
- [ ] Go API — auth, video upload, recipe CRUD
- [ ] Rust video processor — transcoding pipeline
- [ ] Feed algorithm — engagement-based ranking
- [ ] AI recipe extraction — audio transcription MVP
- [ ] Manual recipe creation flow
- [ ] Production deployment

---

<div align="center">

<img width="100%" height="4" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='4'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23E8D5B7' stop-opacity='0'/%3E%3Cstop offset='30%25' stop-color='%232D9B8A'/%3E%3Cstop offset='70%25' stop-color='%231E7A6B'/%3E%3Cstop offset='100%25' stop-color='%23E8D5B7' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1200' height='4'/%3E%3C/svg%3E" />

<br/>

<sub>Built with care · Domain-driven · Designed to scale</sub>

</div>
