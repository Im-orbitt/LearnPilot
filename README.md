# LearnPilot

<img width="1366" alt="hero-modified" src="https://github.com/user-attachments/assets/55a14891-943f-48b2-96b5-47954b1d2511" />

> Upload a chapter. Master it with AI.

**LearnPilot** is an **AI-powered learning platform** that transforms **textbook chapters into structured, interactive study experiences**.

Upload a textbook chapter as a PDF and LearnPilot turns it into:

- **Structured chapter topics**
- **Detailed study notes**
- **Topic-based quizzes**
- **Quiz answer review**
- **A personal learning library**
- **A guided lesson workflow**

## Features

### Smart Notes

Turn textbook content into detailed, topic-organized study notes designed for actual revision.

### AI Quizzes

Generate topic-based multiple-choice questions to test your understanding, with scoring and answer review.

### Guided Lessons

Work through each topic using a structured learning flow:

1. Review your notes
2. Test your understanding
3. Ask the AI Tutor

The AI Tutor interface is currently being prepared for a future release.

### Personal Library

Keep uploaded chapters and generated learning material organized in your own library.

### Authentication

Create an account and securely access your own books and learning content.

### Progress Tracking

Progress tracking is planned for a future release.

### Free Plan

The Free plan currently supports up to **2 books per user**.

## How it works

1. **Create an account**
2. **Upload a PDF**
3. Extract textbook content
4. Generate chapter structure
5. Generate topic-based study notes
6. Generate quizzes
7. Save the generated chapter to your library
8. Study topics through the guided lesson workflow

## Tech Stack

### Frontend

- **React**
- **Vite**
- **React Router**
- **Lucide React**
- **React Markdown**

### Backend

- **FastAPI**
- **Python**
- **PyMuPDF**
- **Google Gemini API**

### Data

- **Supabase**
- **PostgreSQL**

### Deployment

- **Vercel** — frontend hosting and production API proxy
- **Render** — FastAPI backend

## Architecture

LearnPilot uses a monorepo structure:

```text
learnpilot/
├── apps/
│   ├── web/          # React + Vite frontend
│   └── api/          # FastAPI backend
├── docs/             # Project documentation
└── ...
```

The frontend communicates with the FastAPI backend through the API layer.
In production, Vercel proxies `/api/*` requests to the Render backend. The backend handles authentication, PDF processing, AI generation, and database persistence.

## Getting Started

For local development instructions, environment variables, architecture, and deployment details, see the documentation in `docs/`.

## Documentation

- [Architecture](./docs/architecture.md)
- [Development](./docs/development.md)
- [Deployment](./docs/deployment.md)

## Project Status

LearnPilot is under active development.

The core learning experience is currently implemented, including:

- User authentication
- PDF upload and processing
- AI-generated chapter structures
- AI-generated study notes
- AI-generated quizzes
- Quiz scoring and answer review
- Personal book library
- Guided lesson workflow
- Supabase/PostgreSQL integration
- Production deployment

The following areas are still planned or being developed:

- AI Tutor
- Progress tracking
- Settings
- Parent dashboard
- Additional learning and personalization features

## License

See the `LICENSE` file for license information.
