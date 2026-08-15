# Deployment Guide

This guide describes the production deployment setup used by LearnPilot.

LearnPilot is deployed as three main services:

```text
┌──────────────────┐
│      Vercel      │
│ React Frontend   │
└────────┬─────────┘
         │
         │ HTTPS
         ▼
┌──────────────────┐
│      Render      │
│  FastAPI Backend │
└───────┬──────────┘
        │
        ├──────────────► Supabase
        │                PostgreSQL
        │
        └──────────────► Google Gemini
                         AI API
```

## Production infrastructure

| Component | Service       | Purpose                                |
| --------- | ------------- | -------------------------------------- |
| Frontend  | Vercel        | Hosts the React application            |
| Backend   | Render        | Hosts the FastAPI API                  |
| Database  | Supabase      | PostgreSQL database                    |
| AI        | Google Gemini | Generates chapters, notes, and quizzes |

---

## 1) Supabase

Supabase provides the production PostgreSQL database.

The application currently uses the following main tables:

```text
users
sessions
books
```

### Database tables

#### `users`

Stores registered user accounts.

```text
id
name
email
password_hash
created_at
```

#### `sessions`

Stores authentication sessions.

```text
token
user_id
created_at
```

#### `books`

Stores user-generated learning content.

```text
id
user_id
filename
chapter_json
created_at
```

The `user_id` columns associate sessions and books with their respective users.

### Supabase credentials

The backend requires:

```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The service-role key must only be used by the backend.

**Never expose the service-role key in the frontend or commit it to Git.**

---

## 2) Gemini API

LearnPilot uses Google Gemini to generate learning content.

The backend requires:

```env
GENAI_API_KEY=...
```

The key is configured as a server-side environment variable.

The frontend never communicates directly with Gemini.

The request flow is:

```text
Frontend
   │
   ▼
FastAPI Backend
   │
   ▼
Gemini API
   │
   ▼
Generated learning content
```

---

## 3) Render Backend

The FastAPI backend is deployed on Render.

The backend application is located at:

```text
apps/api/
```

### Render root directory

Because LearnPilot is a monorepo, the Render service should use:

```text
apps/api
```

as its root directory.

This keeps the backend deployment isolated from the frontend.

### Build

Install the Python dependencies from:

```text
requirements.txt
```

The backend dependencies can be installed with:

```bash
pip install -r requirements.txt
```

### Start command

The FastAPI application is started with Uvicorn.

```bash
uvicorn app:app --host 0.0.0.0 --port $PORT
```

Render provides the `$PORT` environment variable.

### Environment variables

Configure these environment variables in Render:

```env
GENAI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ENVIRONMENT=production
```

Do not place production credentials in the repository.

---

## 4) Vercel Frontend

The React frontend is deployed on Vercel.

The frontend is located at:

```text
apps/web/
```

### Vercel root directory

Because LearnPilot is a monorepo, the Vercel project should use:

```text
apps/web
```

as its root directory.

### Install and build

Vercel installs dependencies using:

```bash
npm install
```

The production build is created with:

```bash
npm run build
```

### Frontend environment variables

Any frontend environment variables should contain only values that are safe to expose to the browser.

**Never put the Supabase service-role key or Gemini API key in the frontend environment.**

---

## 5) CORS

The FastAPI backend uses CORS to allow requests from the deployed frontend.

The production frontend origin must be included in the backend's CORS configuration.

The development frontend is:

```text
http://localhost:5173
```

The production frontend is hosted on Vercel.

The backend should allow only the production frontend origin while avoiding unnecessarily broad production CORS rules.

---

## 6) Authentication in Production

LearnPilot uses HTTP-only session cookies.

In production, cookies are configured with:

```text
Secure
SameSite=None
HttpOnly
```

This allows the frontend and backend to operate across their separate production origins while keeping the session cookie inaccessible to frontend JavaScript.

The backend creates a session after successful registration or login.

The session token is stored in Supabase and sent to the browser as an HTTP-only cookie.

```text
Login
  │
  ▼
FastAPI
  │
  ├── Create session
  │
  ├── Store session in Supabase
  │
  └── Set HTTP-only cookie
          │
          ▼
       Browser
```

---

## 7) Deployment flow

LearnPilot is deployed from the monorepo.

```text
Git Repository
      │
      ├─────────────────────┐
      │                     │
      ▼                     ▼
 apps/web/               apps/api/
      │                     │
      ▼                     ▼
   Vercel                 Render
      │                     │
      └──────────┬──────────┘
                 │
                 ▼
             Production
```

Changes to the frontend are built and deployed through Vercel.

Changes to the backend are built and deployed through Render.

Supabase remains the shared production database.

---

## 8) Production deployment checklist

Before deploying a new version, verify:

### Frontend

- [ ] Frontend builds successfully
- [ ] `npm run lint` passes
- [ ] Production API configuration is correct
- [ ] No secret credentials are included in frontend code

### Backend

- [ ] Backend starts successfully
- [ ] Required environment variables are configured
- [ ] Production CORS origin is correct
- [ ] Supabase connection works
- [ ] Gemini API connection works
- [ ] Authentication works
- [ ] PDF upload works

### Database

- [ ] Required Supabase tables exist
- [ ] Foreign-key relationships are configured
- [ ] Production credentials are correct
- [ ] Database access is restricted appropriately

### Security

- [ ] `.env` files are not committed
- [ ] API keys are not present in source code
- [ ] Supabase service-role credentials are backend-only
- [ ] Production cookies use secure settings

---

## 9) Verifying a deployment

After deployment, verify the backend first.

The FastAPI root endpoint should respond successfully:

```text
GET /
```

Expected response:

```json
{
  "message": "Backend Online!"
}
```

Then verify the frontend can communicate with the production backend.

Test the main application flow:

1. Open the deployed frontend.
2. Register a new account.
3. Log in.
4. Upload a textbook chapter.
5. Wait for processing to complete.
6. Verify the generated notes and quizzes.
7. Open the library.
8. Confirm the book is stored and displayed correctly.
9. Log out and verify the session is invalidated.

---

## 10) Updating the production application

LearnPilot's deployment platforms are connected to the Git repository.

After completing and testing a change:

```bash
git add .
git commit -m "type(scope): description"
git push
```

The connected deployment services can then build and deploy the updated applications.

Always test important changes locally before pushing them to production.

---

## Deployment architecture summary

The final production setup is:

```text
                    Git Repository
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
          apps/web/             apps/api/
              │                     │
              ▼                     ▼
           Vercel                Render
              │                     │
              │ HTTPS               │
              └──────────┬──────────┘
                         │
                         ▼
                     Supabase
                    PostgreSQL
                         │
                         │
                  Gemini API
```

LearnPilot keeps the frontend, backend, database, and AI service separated so each part can be deployed and managed independently.

## Related documentation

- [Architecture](./architecture.md)
- [Development](./development.md)
- [README](../README.md)
