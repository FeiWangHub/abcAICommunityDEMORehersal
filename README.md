# ABC AI Community

A centralized platform for colleagues to discover AI resources and stay updated with the latest AI information.

## Tech Stack

- **Frontend**: React + Vite + MUI (Material Design)
- **Backend**: Python 3.12 + FastAPI
- **Database**: Supabase

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.12+
- Supabase account and project

### Running the Project

#### 1. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app/main.py
```

The backend will be available at `http://localhost:8000`.

#### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Database Setup

The database schema is managed via Supabase migrations located in `supabase/migrations`.

## Features

- **Home Page**: Modern hero section with quick navigation.
- **External Resources**: Categorized list of third-party AI tools and benchmarks.
- **Internal Resources**: Company-specific AI platforms and software guides.
- **Feedback System**: Integrated message box for user feedback.
- **Responsive Design**: Works on both desktop and mobile devices.
