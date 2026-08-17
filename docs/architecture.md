# LearnPilot — Architecture

> **Documentation policy:** This document is updated when the architecture changes.
>
> **Last updated:** v0.8.1

LearnPilot is a client-server learning platform. The frontend handles the user interface and communicates with a FastAPI backend, while the backend handles authentication, PDF processing, AI generation, and database operations.

## System overview

```text
                         Browser
                            │
                            ▼
                     React + Vite
                            │
                         /api/*
                            │
                            ▼
                         Vercel
                     API proxy/rewrite
                            │
                            ▼
                       FastAPI API
                       /         \
                      /           \
                     ▼             ▼
              Google Gemini    Supabase
                AI generation   PostgreSQL
```

The frontend never communicates directly with Gemini or uses privileged Supabase credentials.

---

## Frontend

The frontend is built with **React + Vite**.

It is responsible for:

- Rendering the user interface
- Handling navigation
- Managing authentication state
- Uploading PDFs
- Displaying generated learning material
- Managing the user's library and learning experience

Frontend API communication is centralized in the services layer.

In production, API requests use the `/api` path. Vercel rewrites these requests to the Render-hosted FastAPI backend.

---

## Backend

The backend is built with **FastAPI**.

It is responsible for:

- Authentication and session management
- API request handling and validation
- PDF processing
- AI-powered content generation
- Book and user data persistence
- Enforcing authenticated access and application limits
- AI-powered content generation
- AI Tutor responses
- Book and user data persistence

The backend is organized around a few main responsibilities:

```text
Routes
  │
  ▼
Services
  │
  ├── AI
  ├── Authentication
  ├── Books
  ├── PDF processing
  ├── Notes
  ├── Quizzes
  └── Tutor

Database
  │
  └── Supabase
```

Routes handle HTTP requests, while services contain the application's core business logic.

---

## Authentication

LearnPilot uses session-based authentication.

```text
Login / Register
       │
       ▼
    FastAPI
       │
       ├── Verify / create user
       │
       ├── Create session
       │
       ▼
    Supabase
       │
       ▼
 HTTP-only session cookie
       │
       ▼
    Browser
```

Authenticated requests include the session cookie. The backend validates the session and determines the associated user before allowing access to protected resources.

The frontend does not have direct access to the session token.

---

## PDF learning pipeline

The main learning pipeline converts a textbook PDF into structured study material.

```text
PDF
 │
 ▼
FastAPI
 │
 ▼
PyMuPDF
 │
 │ extracted text
 ▼
Chapter structure
 │
 ├──────────────► Notes
 │
 └──────────────► Quiz
        │
        ▼
   Google Gemini
        │
        ▼
Generated learning material
        │
        ▼
    Supabase
        │
        ▼
     Frontend
```

The backend extracts readable text from the PDF, uses Gemini to generate the chapter structure and learning material, combines the results, and stores the completed book in Supabase.

---

## AI Tutor

The AI Tutor provides topic-grounded answers and explanations using the learning material associated with the selected book.

```text
Student question
       │
       ▼
React Tutor page
       │
       │ POST /tutor
       ▼
FastAPI Tutor route
       │
       ├── Authenticate user
       ├── Load user's books
       ├── Select learning context
       └── Pass context + question
                    │
                    ▼
              Gemini Tutor
                    │
                    ▼
              Tutor response
                    │
                    ▼
              React Tutor UI
```

Tutor requests are handled entirely by the backend. The frontend never communicates directly with Gemini.

Tutor responses are returned as Markdown and rendered by the frontend using React Markdown and the shared Markdown utilities.

The Tutor is instructed to stay grounded in the provided learning material. Questions outside that material may receive a response explaining that the information is not covered by the available learning context.

---

## Data

LearnPilot uses **Supabase / PostgreSQL** for persistent application data.

The main data areas are:

```text
Users
  │
  ├── Sessions
  │
  └── Books
       │
       └── Generated learning material
```

Books are associated with their owner through `user_id`, allowing authenticated users to access only their own learning content.

---

## Production architecture

The production applications are deployed separately:

```text
                     GitHub
                    /      \
                   ▼        ▼
                Vercel    Render
                  │          │
            React frontend  FastAPI
                  │          │
                  └─ /api ──►│
                             │
                       ┌─────┴─────┐
                       ▼           ▼
                   Supabase     Gemini
```

Vercel hosts the frontend and proxies `/api/*` requests to Render. Render hosts the FastAPI backend, which communicates with Supabase and Google Gemini.

This separation keeps frontend hosting, backend processing, database storage, and AI services independent.

---

## Security model

Sensitive operations remain on the backend.

The frontend does not receive:

- Gemini API credentials
- Supabase service-role credentials
- Password hashes
- Privileged database access

Passwords are stored as secure hashes, and authentication uses HTTP-only session cookies.

Production secrets are provided through environment variables rather than stored in the repository.

---

## Core design principle

LearnPilot keeps responsibilities separated:

```text
Frontend
  → User experience

Backend
  → Application logic

Supabase
  → Persistent data

Gemini
  → AI generation

Vercel / Render
  → Production hosting
```

This allows each part of the system to evolve independently while keeping sensitive operations and application logic on the backend.
