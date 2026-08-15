# LearnPilot — Architecture

> **Documentation policy:** This document is updated at each LearnPilot release.
> It may not reflect unreleased changes on the current development branch.
>
> **Last updated:** v0.7.0

This document describes LearnPilot's architecture, including the frontend, backend, AI learning pipeline, authentication, database interactions, and monorepo structure.

## System overview

LearnPilot follows a client-server architecture:

```text
Student (Browser)
        │
        │ HTTP
        ▼
React + Vite Frontend
        │
        │ HTTP
        ▼
FastAPI Backend
        │
        ├────────► Google Gemini
        │             │
        │             └── AI-generated learning content
        │
        ├────────► Supabase / PostgreSQL
        │             │
        │             └── Users, sessions, books
        │
        └────────► PyMuPDF
                      │
                      └── PDF text extraction
```

### Responsibilities

**Frontend (React + Vite)**

- Render the application UI
- Handle user interaction
- Upload textbook PDFs
- Communicate with the backend API
- Display chapters, notes, and quizzes
- Manage authentication state
- Manage the user's book/library state
- Provide reusable UI components and feature-specific components

**Backend (FastAPI)**

- Handle authentication and sessions
- Validate API requests
- Extract text from uploaded PDFs
- Generate chapter structures, notes, and quizzes through Gemini
- Persist books and user data in Supabase
- Enforce user-specific access and free-plan limits

---

## Monorepo structure

LearnPilot is organized as a monorepo containing independent frontend and backend applications.

```text
learnpilot/
├── apps/
│   ├── api/
│   │   ├── app.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── db/
│   │   │   └── supabase.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── books.py
│   │   │   └── upload.py
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   └── books.py
│   │   ├── services/
│   │   │   ├── ai.py
│   │   │   ├── auth.py
│   │   │   ├── books.py
│   │   │   ├── notes.py
│   │   │   ├── parser.py
│   │   │   ├── pdf.py
│   │   │   └── quiz.py
│   │   ├── utils/
│   │   │   └── auth.py
│   │   └── requirements.txt
│   │
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   ├── contexts/
│       │   ├── features/
│       │   ├── hooks/
│       │   ├── layouts/
│       │   ├── pages/
│       │   ├── providers/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── styles/
│       │   └── utils/
│       ├── package.json
│       └── vite.config.js
│
├── docs/
│   ├── architecture.md
│   ├── development.md
│   └── deployment.md
│
├── LICENSE
└── README.md
```

The frontend and backend can be developed and deployed independently while remaining part of the same repository.

---

# Frontend architecture

The frontend is built with **React + Vite**.

Its responsibilities include:

- Rendering the application interface
- Handling navigation and routes
- Managing authentication state
- Uploading PDFs
- Calling backend APIs
- Displaying generated learning material
- Managing the user's book/library state

Sensitive operations such as Gemini API calls, password hashing, session handling, and Supabase service-role access remain on the backend.

## Frontend structure

The frontend separates reusable UI, application features, pages, state, and shared styling.

```text
src/
├── components/
│   ├── auth/
│   ├── feedback/
│   ├── layout/
│   └── ui/
│
├── contexts/
├── features/
├── hooks/
├── layouts/
├── pages/
├── providers/
├── routes/
├── services/
├── styles/
└── utils/
```

### Components

`components/` contains reusable application-wide components.

Examples include:

- `Button`
- `Card`
- `FileUpload`
- `Spinner`
- `Avatar`
- `Badge`
- `NotificationPopover`
- `EmptyState`
- `Navbar`
- `Sidebar`
- `Topbar`
- `Footer`

UI components are designed to be reusable rather than recreating the same markup inside individual pages.

### Features

`features/` contains components that belong to a specific product area.

Current feature areas include:

- `landing`
- `dashboard`
- `library`
- `chapter`
- `lesson`

For example:

```text
features/
└── lesson/
    ├── LessonOption/
    ├── NotesViewer/
    ├── QuizCard/
    ├── QuizReview/
    ├── QuizSection/
    ├── QuizSession/
    └── TutorChat/
```

This keeps feature-specific UI separate from generic reusable components.

### Pages

`pages/` contains route-level components.

Current pages include:

- Landing
- Login
- Register
- Dashboard
- Library
- Chapter
- Lesson
- Notes
- Quiz
- Quiz Answers
- Tutor
- Progress
- Parent
- Settings

Some pages and features are still under active development and may contain placeholder functionality.

### Layouts

`layouts/` defines larger page structures used across routes.

Current layouts include:

- `MainLayout`
- `AuthLayout`
- `DashboardLayout`

### Providers and contexts

Application-level state is handled through React providers and contexts.

Current state areas include:

- Authentication
- Book/library data
- Quiz answers

### Services

`services/` contains frontend API and configuration logic.

```text
services/
├── api.js
├── auth.js
└── config.js
```

Components and pages use these services instead of directly implementing API communication throughout the UI.

### Shared styles

Global design values and shared styling are centralized under:

```text
styles/
├── globals.css
└── variables.css
```

`variables.css` contains reusable design tokens such as colors, spacing, typography, radii, and transitions.

`globals.css` contains application-wide CSS rules.

Feature, page, layout, and component styles remain colocated with their respective components where appropriate.

---

# Backend architecture

The backend is built with **FastAPI**.

The main entry point is:

```text
apps/api/app.py
```

The backend is separated into routes, schemas, services, database access, configuration, and utilities.

```text
api/
├── app.py
├── core/
├── db/
├── routes/
├── schemas/
├── services/
└── utils/
```

## Routes

`routes/` contains HTTP endpoint definitions.

```text
routes/
├── auth.py
├── books.py
└── upload.py
```

### `routes/auth.py`

Handles authentication endpoints such as:

- Registration
- Login
- Logout
- Current-user lookup

### `routes/books.py`

Handles authenticated book/library operations.

### `routes/upload.py`

Handles PDF upload and starts the learning-material generation pipeline.

Keeping endpoint definitions in route modules prevents `app.py` from becoming a large collection of business logic.

---

## Schemas

`schemas/` contains request and response models used by the API.

```text
schemas/
├── auth.py
└── books.py
```

Schemas provide structured validation for API data entering and leaving the backend.

---

## Services

`services/` contains the backend's core business logic.

```text
services/
├── ai.py
├── auth.py
├── books.py
├── notes.py
├── parser.py
├── pdf.py
└── quiz.py
```

### `services/pdf.py`

Extracts text from uploaded PDFs using PyMuPDF.

### `services/parser.py`

Converts extracted textbook content into a structured chapter/topic representation.

### `services/ai.py`

Provides the Gemini integration used for AI-generated learning material.

### `services/notes.py`

Generates topic-based study notes.

### `services/quiz.py`

Generates topic-based multiple-choice quizzes.

### `services/auth.py`

Handles authentication business logic including:

- Password hashing
- Password verification
- Session creation
- Session lookup
- Session deletion

### `services/books.py`

Handles book persistence and retrieval through the database layer.

---

## Database layer

Database access is located under:

```text
db/
└── supabase.py
```

This module provides the configured Supabase client used by backend services.

Supabase provides the production PostgreSQL database.

---

## Core configuration

Backend configuration is centralized under:

```text
core/
└── config.py
```

Configuration values are loaded from environment variables rather than being hardcoded into the application.

Sensitive values such as API keys and database credentials are kept in environment variables and are not committed to the repository.

---

## Authentication utilities

Authentication-related request utilities are located under:

```text
utils/
└── auth.py
```

These utilities are used by protected routes to identify the authenticated user from their session.

---

# Authentication architecture

LearnPilot uses **session-based authentication**.

```text
Register / Login
      │
      ▼
 FastAPI Route
      │
      ▼
 Auth Service
      │
      ├──────► Supabase
      │
      ▼
 Create Session
      │
      ▼
 HTTP-only Cookie
      │
      ▼
 Browser
      │
      │ subsequent requests
      ▼
 FastAPI
      │
      ▼
 Validate Session
      │
      ▼
 Authenticated User
```

## Registration flow

1. The frontend submits registration data.
2. The backend validates the request.
3. The password is hashed using `scrypt`.
4. The user is stored in the `users` table.
5. A session token is generated.
6. The session is stored in the `sessions` table.
7. The session token is returned as an HTTP-only cookie.
8. The frontend receives the authenticated user.

## Login flow

1. The frontend submits email and password.
2. The backend looks up the user.
3. The supplied password is verified against the stored hash.
4. A new session token is generated.
5. The session is stored in Supabase.
6. The session token is sent as an HTTP-only cookie.

## Authenticated requests

Protected requests:

1. Receive the session cookie.
2. Validate the session.
3. Resolve the associated user.
4. Use the authenticated `user_id` to scope database operations.

This prevents one user from accessing another user's books.

## Logout flow

1. The backend removes the active session.
2. The session cookie is cleared.
3. The frontend clears its authenticated user state.

---

# Book data model

Books are associated with the user who uploaded them.

```text
User
 ├── Book
 ├── Book
 └── ...
```

Each book contains:

```text
books
├── id
├── user_id
├── filename
├── chapter_json
└── created_at
```

`chapter_json` stores the generated chapter structure and learning material, including topics, notes, and quizzes.

All authenticated book queries are scoped using the current user's `user_id`.

---

# AI learning pipeline

The core LearnPilot pipeline transforms a textbook PDF into structured learning material.

```text
PDF
 │
 ▼
Extract Text
 │
 ▼
Generate Chapter Structure
 │
 │ Gemini
 ▼
Topics
 │
 ├──────────────► Generate Notes
 │                    │
 │                    └── Gemini
 │
 └──────────────► Generate Quiz
                      │
                      └── Gemini
 │
 ▼
Combine Generated Material
 │
 ▼
Store Book in Supabase
 │
 ▼
Return Book Data
 │
 ▼
React Frontend
```

## Step 1 — PDF extraction

The uploaded PDF is processed by:

```text
services/pdf.py
```

PyMuPDF extracts the readable textbook text.

## Step 2 — Chapter structure

The extracted content is passed through the parser/AI pipeline to produce:

- Chapter title
- Chapter summary
- Topics

Example:

```json
{
  "title": "Example Chapter",
  "summary": "Chapter summary",
  "topics": [
    {
      "title": "Topic 1"
    },
    {
      "title": "Topic 2"
    }
  ]
}
```

## Step 3 — Notes generation

LearnPilot generates revision-oriented notes for the topics.

The goal is to produce useful study material rather than simply returning the original textbook text.

## Step 4 — Quiz generation

The quiz pipeline generates multiple-choice questions for the generated topics.

Questions include:

- Question text
- Four options
- Correct answer

## Step 5 — Combine and persist

The generated chapter structure, notes, and quizzes are combined into the book's `chapter_json`.

The completed book is then saved to Supabase.

---

# Upload flow

The `/upload` endpoint coordinates the complete textbook-processing pipeline.

```text
Browser
  │
  │ PDF upload
  ▼
POST /upload
  │
  ├─ Authenticate user
  │
  ├─ Check Free-plan book limit
  │
  ├─ Read uploaded PDF
  │
  ├─ Extract text
  │
  ├─ Generate chapter structure
  │
  ├─ Generate notes
  │
  ├─ Generate quizzes
  │
  ├─ Combine generated material
  │
  └─ Save book to Supabase
              │
              ▼
        Return book data
```

The current Free plan supports up to **two stored books per user**.

---

# Database architecture

LearnPilot uses **Supabase / PostgreSQL** for persistent application data.

The core tables are:

```text
users
sessions
books
```

## `users`

```text
users
├── id
├── name
├── email
├── password_hash
└── created_at
```

Stores registered user accounts.

## `sessions`

```text
sessions
├── token
├── user_id
└── created_at
```

Stores active authentication sessions.

## `books`

```text
books
├── id
├── user_id
├── filename
├── chapter_json
└── created_at
```

Stores generated learning material associated with each user.

---

# Security model

LearnPilot keeps sensitive operations on the backend.

The frontend never directly handles:

- Gemini API credentials
- Supabase service-role credentials
- Password hashes
- Session token generation
- Authentication database operations

Authentication uses HTTP-only cookies so that session tokens are not directly accessible through normal frontend JavaScript.

Passwords are stored as secure hashes rather than plaintext.

Protected database operations are scoped to the authenticated user's `user_id`.

Environment secrets such as API keys and database credentials are stored in environment variables and excluded from version control.

---

# Deployment architecture

LearnPilot is deployed as two separate applications from the same monorepo.

```text
GitHub Repository
       │
       ├──────────────► Vercel
       │                  │
       │                  └── React + Vite frontend
       │
       └──────────────► Render
                          │
                          └── FastAPI backend
                                   │
                                   ├──► Gemini
                                   │
                                   └──► Supabase
```

The frontend communicates with the deployed FastAPI backend over HTTP.

---

# Current architecture status

As of **v0.7.0**, the core LearnPilot architecture is functional.

Implemented core systems include:

- React + Vite frontend
- FastAPI backend
- Monorepo structure
- PDF upload and extraction
- AI chapter generation
- AI notes generation
- AI quiz generation
- Supabase persistence
- User authentication
- Session-based authorization
- Personal book library
- Free-plan book limit
- Reusable UI components
- Feature-based frontend organization
- Production deployment

Several secondary pages and planned features remain under development. These do not affect the core textbook-to-learning-material pipeline.

---

## Related docs

- [Development](./development.md)
- [Deployment](./deployment.md)

```

```
