# LearnPilot — Architecture

> **Documentation policy:** This document is updated at each LearnPilot release.
> It may not reflect unreleased changes on the current development branch.
>
> **Last updated:** v0.6.1

This document describes LearnPilot’s architecture: frontend, backend, the AI learning pipeline, authentication, and database interactions.

## System overview

LearnPilot follows a simple request flow:

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
        ├────────► Google Gemini (AI generation)
        ├────────► Supabase (PostgreSQL storage)
        └────────► PyMuPDF (PDF parsing)
```

### Responsibilities

- **Frontend (React + Vite):**
  - UI rendering
  - PDF upload
  - Calling backend APIs
  - Displaying chapters, notes, and quizzes
  - Managing the user’s library view

- **Backend (FastAPI):**
  - Authentication + session handling
  - PDF text extraction
  - Chapter structure / notes / quiz generation via Gemini
  - Persistence to Supabase
  - Security checks (e.g., free-plan limits)

---

## Monorepo structure

LearnPilot is organized as a monorepo. A typical layout looks like this:

```text
learnpilot/
├── apps/
│   ├── web/           # React + Vite frontend
│   └── api/           # FastAPI backend
│       ├── app.py
│       └── services/
│           ├── ai.py
│           ├── auth.py
│           ├── books.py
│           ├── notes.py
│           ├── parser.py
│           ├── pdf.py
│           ├── quiz.py
│           └── supabase.py
├── docs/
│   ├── architecture.md
│   ├── development.md
│   └── deployment.md
├── LICENSE
└── README.md
```

The `web` and `api` applications can be developed and deployed independently while remaining within the same repo.

---

## Frontend architecture (React + Vite)

The frontend is responsible for:

- Rendering the application interface
- Uploading a PDF
- Communicating with the backend via HTTP
- Displaying generated results
- Managing the UI around the user’s library

Sensitive operations (Gemini calls, Supabase service-role credentials, password hashing, session validation) are intentionally handled on the backend.

---

## Backend architecture (FastAPI)

The backend is built with **FastAPI**. Its main entry point is:

- `apps/api/app.py`

### Endpoint responsibilities

The API exposes endpoints for:

- Registration / login / logout
- Current-user lookup
- Book retrieval
- Upload + processing of PDFs into learning material

### Service modules

Key service modules include:

- `services/pdf.py`  
  Extracts text from uploaded PDFs (via PyMuPDF).

- `services/parser.py`  
  Converts extracted textbook content into a chapter/topic structure.

- `services/notes.py`  
  Generates topic-based detailed study notes.

- `services/quiz.py`  
  Generates topic-based multiple-choice quizzes.

- `services/ai.py`  
  Wraps calls to the Google Gemini API (chapter structure, notes, quizzes).

- `services/auth.py`  
  Implements password hashing, session creation, session lookup, and logout logic.

- `services/books.py`  
  Reads/writes user books in Supabase.

- `services/supabase.py`  
  Provides the configured Supabase client for backend use.

---

## Authentication architecture

LearnPilot uses **session-based authentication**.

```text
Register / Login
      │
      ▼
 FastAPI Backend
      │
      ▼
   Supabase
      │
      ▼
 Create session
      │
      ▼
 HTTP-only cookie (browser stores it)
      │
      ▼
 Subsequent requests include cookie
```

### Registration flow

1. Backend validates the request
2. Password is hashed using `scrypt`
3. User is stored in the `users` table
4. Session token is created and stored in `sessions`
5. Session token is sent to the browser via an **HTTP-only cookie**

### Login flow

1. Backend looks up user by email
2. Verifies supplied password against stored hash
3. Creates a new session token
4. Stores it in `sessions`
5. Sends it to the browser as an HTTP-only cookie

### Authenticated requests

For protected endpoints, the backend:

1. Reads the session cookie
2. Loads the session + user
3. Uses `user_id` to scope database access

### Logout flow

- Deletes the session in Supabase
- Removes the session cookie client-side

---

## Book data model

Books live in Supabase and are associated with a user.

```text
User
 ├── Book (filename, chapter_json, created_at)
 ├── Book (filename, chapter_json, created_at)
 └── ...
```

Each stored book includes:

- `id`
- `user_id`
- `filename`
- `chapter_json` (serialized chapter structure + notes + quizzes)
- `created_at`

User-specific queries filter by authenticated `user_id`.

---

## AI learning pipeline (textbook → study materials)

The core pipeline converts a textbook chapter into:

- chapter structure (topics)
- detailed notes per topic
- multiple-choice quizzes per topic

```text
PDF
 │
 ▼
Extract Text
 │
 ▼
Chapter Structure (Gemini)
 │
 ├────────► Topics
 │            │
 │            ├──► Generate Notes (Gemini)
 │            │
 │            └──► Generate Quiz (Gemini)
 │
 ▼
Combine Results
 │
 ▼
Store Book in Supabase
 │
 ▼
Return to Client
```

### Step 1 — PDF extraction

`services/pdf.py` uses PyMuPDF to extract text from the uploaded PDF.

### Step 2 — Chapter structure generation

Extracted text is sent to Gemini to produce:

- chapter title
- chapter summary
- list of topics

Example structure:

```json
{
  "title": "Example Chapter",
  "summary": "Chapter summary",
  "topics": [{ "title": "Topic 1" }, { "title": "Topic 2" }]
}
```

### Step 3 — Notes generation

Gemini generates revision-oriented notes designed to help learning, not just summarize.

### Step 4 — Quiz generation

Quizzes are generated per topic and include:

- question
- four options
- correct answer

### Step 5 — Combine + persist

The backend merges chapter structure + notes + quizzes into `chapter_json` and saves the completed book in Supabase.

---

## Upload flow (`/upload`)

The upload endpoint orchestrates the pipeline:

```text
Browser
  │  PDF upload
  ▼
POST /upload
  │
  ├─ Check authentication
  ├─ Check Free-plan book limit
  ├─ Read PDF + extract text
  ├─ Generate chapter structure
  ├─ Generate notes
  ├─ Generate quizzes
  ├─ Combine results
  └─ Save to Supabase
              │
              ▼
        Return book data
```

Free plan users are limited to **two stored books**.

---

## Database architecture (Supabase / PostgreSQL)

Supabase is used as the production datastore. Core tables:

```text
users
sessions
books
```

### `users`

Stores account information:

```text
users
├── id
├── name
├── email
├── password_hash
└── created_at
```

### `sessions`

Stores active authentication sessions:

```text
sessions
├── token
├── user_id
└── created_at
```

### `books`

Stores generated learning content:

```text
books
├── id
├── user_id
├── filename
├── chapter_json
└── created_at
```

---

## Security model

LearnPilot keeps sensitive operations on the backend:

- Gemini API credentials
- Supabase service-role credentials
- Password hashes
- Session token handling

Authentication uses **HTTP-only cookies**, reducing direct access from frontend JavaScript.

All password storage uses hashing, and database access is scoped by the authenticated user’s `user_id`.

---

## Related docs

- [Development](./development.md)
- [Deployment](./deployment.md)
