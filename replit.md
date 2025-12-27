# Ravankargah Psychology Institute

## Overview
A full-stack web application for Ravankargah Psychology Institute (روانکارگاه) featuring:
- Psychology course catalog and enrollment
- MCMI-II (Millon Clinical Multiaxial Inventory) psychological assessment
- User authentication and profile management
- Admin panel for course and user management

## Project Architecture

### Directory Structure
```
/
├── frontend/           # React + Vite frontend
│   ├── components/     # Reusable UI components
│   ├── context/        # React contexts (Auth, Course, Comment)
│   ├── pages/          # Page components
│   ├── data/           # Mock data and MCMI data
│   ├── utils/          # Utility functions and MCMI scoring
│   ├── vite.config.ts  # Vite config with API proxy
│   └── package.json    # Frontend dependencies
│
├── backend/            # Node.js + Express API
│   ├── public/         # Built frontend files (production)
│   ├── src/
│   │   ├── config/     # Database and env configuration
│   │   ├── models/     # Sequelize models
│   │   ├── controllers/# Route handlers
│   │   ├── routes/     # API route definitions
│   │   ├── middleware/ # JWT auth and role guards
│   │   ├── services/   # Business logic (MCMI scoring)
│   │   └── uploads/    # PDF certificate storage
│   ├── server.js       # Main Express server
│   └── package.json    # Backend dependencies
│
├── package.json        # Root package with run scripts
└── attached_assets/    # Uploaded assets
```

### Frontend (React + Vite)
- **Framework**: React 18.2 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (CDN)
- **Routing**: React Router DOM
- **Port**: 5000 (dev), served from backend in production
- **API Proxy**: Routes `/api/*` requests to backend on port 3000

### Backend (Express + PostgreSQL)
- **Framework**: Express.js with ES Modules
- **Database**: PostgreSQL (Replit Neon) with Sequelize ORM
- **Authentication**: JWT with bcrypt password hashing
- **File Uploads**: Multer (PDF only)
- **Port**: 3000 (uses process.env.PORT)

## Running the App

### In Replit (Recommended)
Both workflows start automatically:
- **Backend** workflow: Runs `cd backend && npm start` on port 3000
- **Frontend** workflow: Runs `cd frontend && npm run dev` on port 5000

### Using Root Scripts
```bash
npm run dev           # Run both frontend and backend
npm run backend       # Run backend only
npm run frontend      # Run frontend only
npm run install:all   # Install all dependencies
npm run build         # Build frontend to backend/public
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user (authenticated)

### MCMI Test
- `POST /api/test/submit` - Submit test answers and get results
- `GET /api/test/history` - Get user's test history
- `GET /api/test/:id` - Get specific test result

### Admin (requires admin role)
- `GET /api/admin/users` - List all users
- `GET/POST/PUT/DELETE /api/admin/courses` - Course CRUD
- `POST /api/admin/upload-certificate` - Upload certificate PDF

### Student
- `GET /api/student/profile` - Get profile
- `PUT /api/student/profile` - Update profile
- `POST /api/student/enroll` - Enroll in course

### Public
- `GET /api/courses` - List active courses
- `GET /api/health` - Health check

## Database Schema (PostgreSQL)
Tables are auto-created by Sequelize on startup:
- **users**: id, name, phone, password, role (student/admin), created_at
- **courses**: id, title, description, price (DECIMAL), teacher_name, status (active/inactive)
- **millon_results**: id, user_id (FK), raw_responses (JSON), calculated_scales (JSON), full_report (TEXT)
- **enrollments**: id, user_id (FK), course_id (FK), status
- **certificates**: id, user_id (FK), course_id (FK), pdf_path, issue_date

## Recent Changes
- **2025-12-27**: Converted to PostgreSQL with Replit database
  - Connected to Replit's PostgreSQL (Neon) using DATABASE_URL
  - Backend now runs on port 3000
  - Server serves static files from /backend/public
  - Frontend builds to backend/public for production
  - All tables auto-sync on startup

## User Preferences
- Persian (Farsi) RTL interface
- Professional psychology/clinical theme
- Oxford Blue (#002147) and Gold (#F4C700) color scheme
