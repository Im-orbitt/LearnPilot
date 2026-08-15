# Development Guide

> **Documentation policy:** This document is updated at each LearnPilot release.
> It may not reflect unreleased changes on the current development branch.
>
> **Last updated:** v0.7.0

This guide explains how to set up LearnPilot for local development.

## Prerequisites

Before starting, make sure you have:

- Git
- Node.js
- npm
- Python 3.13+
- A Supabase project
- A Google Gemini API key

## Clone the repository

```bash
git clone <repository-url>
cd learnpilot
```

## Project structure

LearnPilot is a monorepo with separate frontend and backend applications:

```text
learnpilot/
├── apps/
│   ├── web/    # React + Vite frontend
│   └── api/    # FastAPI backend
├── docs/
├── LICENSE
└── README.md
```

The frontend and backend are developed independently and run as separate processes.

---

## Backend setup

The backend is located in:

```text
apps/api/
```

### 1) Create a virtual environment

From the repository root:

```powershell
cd apps/api
```

Create the virtual environment:

```powershell
python -m venv .venv
```

### 2) Activate the virtual environment

On Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

On Windows Command Prompt:

```cmd
.venv\Scripts\activate
```

On macOS/Linux:

```bash
source .venv/bin/activate
```

### 3) Install dependencies

```powershell
pip install -r requirements.txt
```

### 4) Configure environment variables

Create a `.env` file inside:

```text
apps/api/.env
```

Add required environment variables:

```env
GENAI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ENVIRONMENT=development
```

**Important:** Never commit `.env` files or secret credentials to Git.  
The Supabase service-role key is a sensitive credential and must remain on the backend.

### 5) Start the backend

From `apps/api`:

```powershell
uvicorn app:app --reload
```

- API: `http://127.0.0.1:8000`
- Swagger UI: `http://127.0.0.1:8000/docs`

---

## Frontend setup

The frontend is located in:

```text
apps/web/
```

Open a second terminal and run:

```powershell
cd apps/web
npm install
npm run dev
```

Vite will print the local URL (typically):

```text
http://localhost:5173
```

---

## Development workflow

### 1) Start the backend

```powershell
cd apps/api
.venv\Scripts\Activate.ps1
uvicorn app:app --reload
```

### 2) Start the frontend

In a second terminal:

```powershell
cd apps/web
npm run dev
```

### 3) Open LearnPilot

Open the frontend URL provided by Vite.

---

# Backend development

The backend entry point is:

```text
apps/api/app.py
```

Backend functionality is separated into service modules:

```text
apps/api/
├── app.py
├── core/
│   └── config.py
├── db/
│   └── supabase.py
├── routes/
│   ├── auth.py
│   ├── books.py
│   └── upload.py
├── schemas/
│   ├── auth.py
│   └── books.py
├── services/
│   ├── ai.py
│   ├── auth.py
│   ├── books.py
│   ├── notes.py
│   ├── parser.py
│   ├── pdf.py
│   └── quiz.py
└── utils/
    └── auth.py
```

When adding backend functionality, keep HTTP endpoint logic in routes/, request/response models in schemas/, configuration in core/, database access in db/, reusable business logic in services/, and authentication helpers in utils/. Keep app.py focused on application setup and router registration.

---

# Frontend development

The frontend uses:

- React
- Vite
- React Router
- React Markdown
- Lucide React

Frontend code is located under:

```text
apps/web/src/
```

Build and preview:

```powershell
npm run build
npm run preview
```

---

# Linting

Run the linter from `apps/web`:

```powershell
npm run lint
```

---

# Database development

LearnPilot uses Supabase for its database. The backend communicates with Supabase through:

```text
apps/api/db/supabase.py
```

When changing schema, update the corresponding backend code as well.

---

# AI development

LearnPilot uses the Google Gemini API for AI-powered content generation.

AI-related logic is located in:

```text
apps/api/services/ai.py
```

Never hard-code API keys into the source code.

```env
GENAI_API_KEY=...
```

---

# Testing the upload pipeline

A typical test:

1. Start backend and frontend
2. Register / login
3. Upload a PDF textbook chapter
4. Wait for notes + quizzes generation
5. Check the generated chapter data in the user’s library

---

# Git workflow

Useful commands:

```powershell
git status
git diff
git add <files>
git commit -m "type(scope): description"
git push
```

---

# Environment and secrets

Never commit:

- Gemini API keys
- Supabase service-role keys
- Session secrets
- Passwords
- Other private credentials

Keep development secrets in:

```text
apps/api/.env
```

Make sure `.env` is included in `.gitignore`. If a secret is accidentally committed, rotate it immediately.

---

# Common development issues

## Backend cannot start

Make sure the virtual environment is activated and dependencies are installed.

## Frontend dependencies are missing

From `apps/web`:

```powershell
npm install
```

## Frontend cannot reach the backend

Ensure both servers are running and check CORS.

Frontend: `http://localhost:5173`  
Backend: `http://127.0.0.1:8000`

## Supabase requests fail

Validate:

```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Gemini requests fail

Validate:

```env
GENAI_API_KEY=...
```

---

# Development checklist

Before merging, verify:

- [ ] Frontend runs successfully
- [ ] Backend runs successfully
- [ ] No new Pylance errors
- [ ] No new ESLint errors
- [ ] Relevant functionality was tested
- [ ] Secrets are not committed
- [ ] `git diff` reviewed
- [ ] Meaningful commit message

---

## Related documentation

- [Architecture](./architecture.md)
- [Deployment](./deployment.md)
- [README](../README.md)
