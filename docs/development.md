# LearnPilot — Development

> **Documentation policy:** This document is updated when the development workflow changes.
>
> **Last updated:** v0.7.1

LearnPilot is developed as a monorepo containing a React frontend and a FastAPI backend.

## Prerequisites

Before developing LearnPilot, you should have:

- Git
- Node.js and npm
- Python 3.13.14
- A Supabase project
- A Google Gemini API key

---

## Getting started

Clone the repository and install the dependencies for both applications.

### Frontend

The frontend uses Node.js and npm.

```bash
cd apps/web
npm install
```

Start the development server with:

```bash
npm run dev
```

### Backend

The backend uses Python 3.13.14 and a virtual environment.

```bash
cd apps/api
python -m venv .venv
```

Activate the environment and install the dependencies:

```bash
pip install -r requirements.txt
```

The backend requires environment variables for Gemini, Supabase, and the development environment.

Run the development server with:

```bash
uvicorn app:app --reload
```

The frontend normally runs on `http://localhost:5173` and the backend on `http://127.0.0.1:8000`.

---

## Environment variables

Development secrets belong in the backend's local `.env` file.

```env
GENAI_API_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ENVIRONMENT=development
```

Never commit real credentials to the repository.

Frontend environment variables should only contain values that are safe to expose to the browser.

---

## Development workflow

When working on LearnPilot:

1. Create a branch for your changes.
2. Make the changes in the appropriate application or module.
3. Run the frontend and backend locally.
4. Test the affected functionality.
5. Run the frontend lint and build checks.
6. Review your changes with Git.
7. Push your branch.
8. Open a Pull Request against `main`.

Keep changes focused and avoid mixing unrelated features or fixes into the same Pull Request.

---

## Frontend development

The frontend uses:

- React
- Vite
- React Router
- React Markdown
- Lucide React

Frontend development should keep reusable UI, feature-specific functionality, pages, state, and API communication separated.

Run the available checks from `apps/web`:

```bash
npm run lint
npm run build
```

---

## Backend development

The backend uses:

- FastAPI
- Python
- PyMuPDF
- Google Gemini
- Supabase

Backend code should keep HTTP handling, business logic, database access, and configuration separated.

When adding functionality, place it in the appropriate existing module rather than putting application logic directly into `app.py`.

---

## Database development

Supabase provides the PostgreSQL database used by LearnPilot.

Changes to the database schema should be coordinated with the backend code that uses that schema.

Never expose the Supabase service-role key to the frontend.

---

## AI development

Gemini powers LearnPilot's chapter, notes, and quiz generation.

AI-related changes should be tested with real textbook content where practical, since changes to prompts or processing logic can affect the generated learning material.

API credentials must always remain server-side.

---

## Testing the application

The most important end-to-end flow is:

```text
Register
   ↓
Login
   ↓
Upload PDF
   ↓
Generate learning material
   ↓
View book in library
   ↓
Open notes and quizzes
```

Changes affecting authentication, uploads, AI generation, or database operations should be tested through the relevant part of this flow.

---

## Git

Useful commands:

```bash
git status
git diff
git add .
git commit -m "type(scope): description"
git push
```

Use clear, focused commit messages that describe the change being made.

---

## Contributing

Contributions and improvements are welcome.

Before making a substantial change, it is recommended to discuss the idea first so that it fits LearnPilot's current direction.

For help with the project, development questions, or larger proposed changes, contact the project maintainer through the contact information provided in the repository or project profile.

Pull Requests should clearly describe what was changed and why, and should include relevant testing information when applicable.

---

## Production deployment

Production deployment is handled separately from local development.

LearnPilot uses:

- **Vercel** for the frontend
- **Render** for the backend
- **Supabase** for the database
- **Google Gemini** for AI generation

See the [Deployment](./deployment.md) documentation for the production architecture and deployment setup.

---

## Related documentation

- [Architecture](./architecture.md)
- [Deployment](./deployment.md)
- [README](../README.md)
