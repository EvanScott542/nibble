# Architecture Baseline

---

## Overview

A video-focused recipe sharing mobile application combining social media-style vertical video feeds with AI-powered recipe generation. The architecture is designed for a mobile-first experience with a clear separation between media handling, business logic, and AI orchestration.

---

## Tech Stack

| Concern          | Technology                     | Notes                   |
| ---------------- | ------------------------------ | ----------------------- |
| Mobile Client    | Expo React Native (TypeScript) | iOS + Android           |
| API Server       | Go (Gin or Chi)                | REST, JWT auth          |
| Video Processing | Rust (Tokio + FFmpeg bindings) | Async, job-driven       |
| Database         | PostgreSQL                     | Neon or Railway for MVP |
| Object Storage   | Cloudflare R2 (S3-compatible)  | Zero egress fees        |
| AI Orchestration | Provider-agnostic via Go API   | Strategy pattern        |
| Auth             | JWT, issued by Go API          |                         |

### Storage Rationale

Cloudflare R2 is preferred over AWS S3 for video storage due to zero egress fees, which are significant at scale for a video-heavy platform. R2 is fully S3-compatible so migration is trivial if needed.

### Go vs Rust Split

Go handles the HTTP/business logic layer — productive, great concurrency, mature ecosystem for API servers. Rust is scoped specifically to the video processing service where raw performance and memory safety matter most (transcoding, thumbnail extraction, format normalization). This avoids Rust's learning curve slowing down the full development cycle while still gaining its benefits where they count.

### Job Queue

For MVP, a Postgres-backed job queue (simple `jobs` table with a polling worker) is sufficient between the Go API and Rust processing service. No Redis or message broker needed until real throughput justifies it. Libraries like `pgmq` are worth evaluating.

---

## Domain Boundaries

The system is organized around five bounded contexts following domain-driven design principles.

### Identity & Access

Owns user accounts, sessions, and authentication. Issues JWTs consumed by all other services. Profile management lives here.

### Content (Video)

Owns video media — upload, storage references, metadata, and playback. Holds a nullable `recipe_id` foreign key representing an optional association to a recipe. Video is the aggregate root of this domain; it does not know about Recipe internals.

### Recipe

Owns recipe content independently of video — ingredients, steps, metadata (cook time, servings, difficulty). Can be created via AI generation or manual input. Recipe is its own aggregate root. The relationship is: a Video optionally _has-one_ Recipe. Recipe does not reference Video.

### Feed & Discovery

Consumes content from the Video domain. Owns ranking, algorithmic recommendation logic, and engagement tracking (views, completions, interactions). Does not own any media or recipe data directly.

### AI Orchestration

A shared infrastructure concern, not a domain unto itself. Provides a provider-agnostic interface (strategy pattern) for recipe generation. Supports local LLMs, OpenAI, and Anthropic as interchangeable providers. Called by the Recipe domain; provider credentials never reach the client.

---

## Key Architectural Decisions

### Recipe ↔ Video Relationship

Recipe and Video are separate domains. Video owns the relationship via a nullable `recipe_id`. This keeps the Recipe domain independently testable and scalable, and means Recipe Button visibility in the feed is simply derived from whether `recipe_id` is null on a given video record.

### Video Streaming

The mobile client streams video directly from R2 using pre-signed URLs issued by the Go API. The API never proxies video bytes — essential for cost and latency at scale.

### AI Calls Are Server-Side

Recipe generation routes through the Go API's Recipe Service. Provider credentials never leave the server, and provider swaps are transparent to the mobile client.

### Video Processing Is Async

After upload, the Go API enqueues a processing job rather than calling the Rust service synchronously. The user is not blocked waiting for transcoding. The Rust service polls for jobs and writes processed video and thumbnails back to R2.

---

## System Context (C4 L1)

```
Mobile App (Expo)
    │
    ├──[REST/JSON]──▶ Go API Server
    │                    ├── Auth Service (JWT)
    │                    ├── Recipe Service ──▶ AI Provider (provider-agnostic)
    │                    ├── Feed Service
    │                    ├──[Read/Write]──▶ PostgreSQL
    │                    └──[Enqueue job]──▶ Rust Processing Service
    │                                            └──[Write]──▶ R2 Object Storage
    │
    └──[Stream video via pre-signed URL]──▶ R2 Object Storage
```

---

## Domains → API Services Mapping (Preliminary)

| Domain            | Go Service              | Rust Involvement               |
| ----------------- | ----------------------- | ------------------------------ |
| Identity & Access | `auth-service`          | None                           |
| Content (Video)   | `video-service`         | Upload triggers processing job |
| Recipe            | `recipe-service`        | None                           |
| Feed & Discovery  | `feed-service`          | None                           |
| AI Orchestration  | Shared lib / middleware | None                           |

---

## What's Not Decided Yet

- Go router: Gin vs Chi (minor — both are fine, Chi is more idiomatic)
- PostgreSQL host: Neon vs Railway vs self-hosted
- Exact AI provider for MVP (local LLM likely for dev, cloud for production)
- L2 Container and L3 Component diagrams (to be detailed in a follow-up session)
- Feed ranking algorithm specifics

---

## Next Steps

1. Detail the Go API internals — L2 Container Diagram
2. Define domain-aligned route structure and service boundaries within the API
3. Schema design for core entities: `users`, `videos`, `recipes`, `feed_events`
4. Define the video upload → processing → publish lifecycle in detail
