# LearnPilot

> Upload a chapter. Master it with AI.

LearnPilot is an AI-powered learning platform that transforms textbook chapters into structured study material.

Upload a textbook chapter as a PDF and LearnPilot turns it into:

- **Structured chapter topics**
- **Detailed study notes**
- **Topic-based quizzes**
- **A personal learning library**

## Features

### Smart Notes

Turn textbook content into detailed, topic-organized study notes designed for actual revision.

### AI Quizzes

Generate topic-based multiple-choice questions to test your understanding.

### Personal Library

Keep your uploaded chapters and generated learning material organized in your own library.

### Authentication

Create an account and securely access your own books and learning content.

### Free Plan

The Free plan currently supports up to **2 books per user**.

## How it works

1. **Upload PDF**
2. Extract textbook content
3. Generate chapter structure
4. Generate study notes
5. Generate quizzes
6. Save to your library

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** FastAPI + Python
- **AI:** Google Gemini
- **Database:** Supabase / PostgreSQL
- **Deployment:** Vercel + Render

## Getting Started

For local development instructions, environment variables, architecture, and deployment details, see the documentation in `docs/`.

## Documentation

- [Architecture](./docs/architecture.md)
- [Development](./docs/development.md)
- [Deployment](./docs/deployment.md)

## Project Status

LearnPilot is under active development.

The core learning pipeline, authentication, personal book library, cloud database integration, and production deployment are currently implemented.

## License

See the `LICENSE` file for license information.
