# LearnPilot — Deployment

> **Documentation policy:** This document is updated when the production infrastructure changes.
>
> **Last updated:** v0.7.1

LearnPilot's production environment is split across several services. The frontend, backend, database, and AI service are hosted and managed separately.

## Production infrastructure

```text
                         GitHub
                       /        \
                      ▼          ▼
                   Vercel      Render
                     │            │
              React frontend   FastAPI API
                     │            │
                     └─ /api ────►│
                                  │
                           ┌──────┴──────┐
                           ▼             ▼
                       Supabase       Gemini
                       PostgreSQL       API
```

| Service           | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| **Vercel**        | Hosts the React frontend and proxies production API requests |
| **Render**        | Hosts the FastAPI backend                                    |
| **Supabase**      | Provides the PostgreSQL database                             |
| **Google Gemini** | Provides AI generation                                       |

---

## Frontend deployment

The frontend is deployed to **Vercel**.

The Vercel project uses:

```text
Root directory: apps/web
```

Vercel builds the React application and serves the resulting production frontend.

Production API requests use:

```text
/api/*
```

Vercel rewrites these requests to the Render backend.

This allows the browser to communicate with the API through the frontend's origin and keeps authentication from depending on third-party cookies.

The production frontend API configuration uses:

```env
VITE_API_URL=/api
```

---

## Backend deployment

The FastAPI backend is deployed to **Render**.

The Render service uses:

```text
Root directory: apps/api
```

The backend is started with:

```bash
uvicorn app:app --host 0.0.0.0 --port $PORT
```

Render provides the `$PORT` environment variable.

The backend requires production environment variables for:

```env
GENAI_API_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ENVIRONMENT=production
```

Production credentials are configured directly in Render and are never committed to the repository.

---

## Database

Production application data is stored in **Supabase / PostgreSQL**.

The backend connects to Supabase using server-side credentials.

The frontend does not connect directly to the database and must never receive the Supabase service-role key.

---

## AI service

LearnPilot uses **Google Gemini** for AI-powered learning material generation.

Gemini requests are made exclusively by the FastAPI backend.

The Gemini API key is stored as a backend environment variable and is never exposed to the frontend.

---

## Authentication

Production authentication uses HTTP-only session cookies.

The production request flow is:

```text
Browser
   │
   │ /api/auth/*
   ▼
Vercel
   │
   │ rewrite
   ▼
Render / FastAPI
   │
   ▼
Supabase
```

The session is stored in Supabase and represented in the browser by an HTTP-only cookie.

The cookie uses secure production settings so that the session token is not accessible to frontend JavaScript.

---

## Deployment workflow

Production deployments are connected to the GitHub repository.

The normal development workflow is:

```text
Create branch
     ↓
Develop and test locally
     ↓
Push branch
     ↓
Open Pull Request
     ↓
Review
     ↓
Merge into main
     ↓
Vercel / Render deploy
```

Contributors should not deploy directly to the production services.

After a Pull Request is merged into `main`, the connected deployment platforms can build and deploy the updated applications.

---

## Production verification

After a production deployment, verify the core application flow:

```text
Open frontend
    ↓
Register / Login
    ↓
Refresh page
    ↓
Session remains active
    ↓
Upload PDF
    ↓
Generate learning material
    ↓
View saved book
    ↓
Logout
```

The backend root endpoint can also be used to verify that the API is online:

```text
GET /
```

Expected response:

```json
{
  "message": "Backend Online!"
}
```

---

## Production security

Production credentials must remain outside the repository.

Never commit:

- Gemini API keys
- Supabase service-role keys
- Passwords
- Session secrets
- Other private credentials

Frontend environment variables must contain only values that are safe to expose to the browser.

---

## Related documentation

- [Architecture](./architecture.md)
- [Development](./development.md)
- [README](../README.md)
