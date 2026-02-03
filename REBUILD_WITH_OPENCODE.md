# ABC AI Community Platform - Project Rebuild Prompt

You are an expert full-stack developer tasked with rebuilding the "ABC AI Community" platform from scratch. This is a modern, high-performance web application designed to empower internal teams with AI tooling, resources, and knowledge.

## Project Overview
The application is a centralized hub bridging the global AI ecosystem with internal innovation. It features a sleek, dark-themed, "tech-savvy" UI with glassmorphism effects and responsive layouts.

## Tech Stack Requirements
- **Frontend**: React (Vite), Material UI (MUI v6), Framer Motion (animations), Lucide React (icons), React Router v7.
- **Backend**: Python FastAPI (Uvicorn), Pydantic.
- **Database**: Supabase (PostgreSQL).
- **Deployment**: Vercel (Monorepo support).
- **Package Management**: npm (Frontend), pip/uv (Backend).

## Core Features & Pages

### 1. Global Navigation (Header)
- **Brand**: "ABC AI Community" logo/text (left-aligned).
- **Navigation Links**:
  - "Internal AI Resources" (leads to `/internal-resources`)
  - "External AI Resources" (leads to `/external-resources`)
- **Style**: Fixed position, blurred glass effect (`backdropFilter`), responsive mobile menu.

### 2. Home Page (`/`)
- **Hero Section**:
  - **Main Title**: "Empowering you with AI tooling, resources, knowledge" (Large, gradient text).
  - **Subtitle**: "The centralized gateway bridging world-class AI ecosystems with our internal innovation hub. Explore the benchmarks, tools, and protocols defining the future of work."
  - **Visuals**: Abstract, high-tech background animation or gradient mesh.
- **Key Value Props**: 3-column grid highlighting "Tools", "Resources", and "Knowledge".

### 3. Internal AI Resources Page (`/internal-resources`)
- **Header**: "Internal AI Assets".
- **"AI Platform" Feature Card** (Hero element):
  - A large, visually distinct card with a dark gradient background.
  - **Model Garden**: Displays internal/external models (e.g., GPT-4o, Claude 3.5, Internal-LLM-v2) as a tag cloud.
  - **RAG Studio**: "Launch Studio" and "Wiki" buttons.
  - **Doc Wiki**: "Read Docs" and "Wiki" buttons.
- **Resource Directory**: Searchable table listing internal tools, their owners, status (Active/Beta), and types.

### 4. External AI Resources Page (`/external-resources`)
- **Header**: "Global AI Ecosystem".
- **Top 10 Leaderboards** (Data-rich tables):
  - **Layout**: Responsive grid (4 columns on large screens, 2 on medium, 1 on mobile).
  - **Content**:
    1. **AI Models** (e.g., Claude 3.5 Sonnet, GPT-4o) - sourced from SWE-bench.
    2. **AI IDEs** (e.g., Cursor, Trae, Windsurf).
    3. **Model Providers** (e.g., OpenRouter, Volcengine).
    4. **AI CLI Tools** (e.g., Claude Code, OpenCode).
- **Design**: Compact tables with "Rank", "Name", "Score/Feature", and "Link" columns. Rows reveal details on hover or via tooltips.

### 5. Backend API (FastAPI)
- **Endpoints**:
  - `GET /api/resources/internal`: Fetch internal tool data from Supabase.
  - `GET /api/resources/external`: Fetch external leaderboard data (or proxy requests).
  - `POST /api/feedback`: Submit user feedback to Supabase.
- **Structure**: Flat structure (`backend/main.py`) for Vercel compatibility.

## UI/UX Design Guidelines
- **Theme**: Dark mode default. Deep blues (`#0f172a`), purples (`#7c3aed`), and slate grays.
- **Typography**: Inter or system-ui. Headings should be bold (fontWeight 800) and tight (letterSpacing -0.5).
- **Effects**:
  - **Glassmorphism**: `background: rgba(30, 41, 59, 0.4)`, `backdropFilter: blur(10px)`.
  - **Gradients**: Text gradients (`linear-gradient(to right, #fff, #94a3b8)`).
  - **Animations**: Subtle entry animations (fade-in, slide-up) using Framer Motion.
- **Responsiveness**: Mobile-first approach. Complex tables transform to stacked cards or scrollable views on mobile.

## Project Structure (Monorepo)
```text
/
├── frontend/
│   ├── src/
│   │   ├── components/ (TopTenChart, Header, Footer)
│   │   ├── pages/ (Home, InternalResources, ExternalResources)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── main.py
│   ├── requirements.txt (fastapi, uvicorn, supabase)
│   └── venv/
├── package.json (Root workspaces config)
└── vercel.json (Deployment config for Python + Vite)
```

## Implementation Instructions
1. **Initialize**: Set up the monorepo structure with `frontend` (Vite) and `backend` (Python) folders.
2. **Backend**: Create the FastAPI app in `backend/main.py` and connect it to a Supabase instance.
3. **Frontend**:
   - Install MUI, Framer Motion, and Lucide React.
   - Implement the `Header` with the specific "Internal" and "External" links.
   - Build the `Home` page with the gradient title.
   - Build `InternalResources` with the "AI Platform" big card.
   - Build `ExternalResources` with the 4 "Top 10" responsive charts.
4. **Deploy**: Configure `vercel.json` to handle rewrites (`/api/*` -> Backend) and static serving (`/*` -> Frontend).

Start by scaffolding the project structure.
