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

## MCMI-II Scoring System
The MCMI-II test scoring follows a complete workflow:
1. **Data Files**: 
   - `frontend/data/mcmiData.ts` - Questions (175) and BR lookup tables for male/female
   - `frontend/utils/mcmiScoring.ts` - Full scoring logic with X, DA, DD, DC, Inp adjustments
   - `backend/src/services/mcmiScoring.js` - Backend scoring service
2. **Scale Order** (25 scales, English names):
   - Desirability (Y), Debasement (Z), Schizoid (1), Avoidant (2), Dependent (3)
   - Histrionic (4), Narcissistic (5), Antisocial (6A), Aggressive/Sadistic (6B)
   - Compulsive (7), Passive-Aggressive (8A), Self-defeating (8B)
   - Schizotypal (S), Borderline (C), Paranoid (P), Anxiety (A), Somatoform (H)
   - Bipolar:Manic (N), Dysthymia (D), Alcohol dependence (B), Drug dependence (T)
   - Thought Disorder (SS), Major Depression (CC), Delusional disorder (PP), Disclosure (X)
3. **Report View**: `frontend/components/McmiReportView.tsx` - English-only report display

## Recent Changes
- **2025-12-28**: MCMI-II scoring bug fixes and verification
  - Fixed female scale '9' (6B/Aggressive-Sadistic) BR lookup table to match reference
  - Fixed zero raw score rule: if rawScore === 0, final score remains 0 (no positive adjustments)
  - Fixed X score calculation: uses rrawx formula as the raw score for scale 25
  - Verified all adjustment logic (X correction, DA, DD, DC, Inpatient) matches reference
  - Reference source: `attached_assets/MCMI-II-lastver_1766953261178.txt` (verified 2025-12-28)
- **2025-12-28**: Standardized MCMI-II reporting system
  - Updated scale order and English names across frontend and backend
  - Consistent scaleNames in mcmiScoring.ts and mcmiScoring.js
  - McmiReportView displays all 25 scales in specified order
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
