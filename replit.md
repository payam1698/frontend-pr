# Ravankargah Psychology Institute

## Overview
A full-stack web application for Ravankargah Psychology Institute (روانکارگاه) featuring:
- Psychology course catalog and enrollment
- MCMI-II (Millon Clinical Multiaxial Inventory) psychological assessment
- User authentication and profile management
- Admin panel for course and user management

## Project Architecture

### Frontend (React + Vite)
- **Framework**: React 18.2 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (CDN)
- **Routing**: React Router DOM
- **Port**: 5000

### Backend (Express + MySQL)
- **Framework**: Express.js with ES Modules
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT with bcrypt
- **File Uploads**: Multer (PDF only)
- **Port**: 3001

## Directory Structure
```
/
├── frontend files (React)
│   ├── components/     # Reusable UI components
│   ├── context/        # React contexts (Auth, Course, Comment)
│   ├── pages/          # Page components
│   ├── data/           # Mock data and MCMI data
│   ├── utils/          # Utility functions and MCMI scoring
│   └── types.ts        # TypeScript interfaces
│
├── backend/
│   ├── src/
│   │   ├── config/     # Database and env configuration
│   │   ├── models/     # Sequelize models
│   │   ├── controllers/# Route handlers
│   │   ├── routes/     # API route definitions
│   │   ├── middleware/ # JWT auth and role guards
│   │   ├── services/   # Business logic (MCMI scoring)
│   │   └── uploads/    # PDF certificate storage
│   ├── server.js       # Main Express server
│   ├── database_setup.sql  # MySQL schema
│   └── .env.example    # Environment template
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
- `GET /api/admin/users/:id` - Get user details
- `GET/POST/PUT/DELETE /api/admin/courses` - Course CRUD
- `POST /api/admin/upload-certificate` - Upload certificate PDF

### Student
- `GET /api/student/profile` - Get profile
- `PUT /api/student/profile` - Update profile
- `GET /api/student/test-history` - Get test results
- `GET /api/student/my-certificates` - Get certificates
- `POST /api/student/enroll` - Enroll in course

### Public
- `GET /api/courses` - List active courses
- `GET /api/courses/:id` - Get course details
- `GET /api/health` - Health check

## Database Schema
- **users**: User accounts with roles (student/admin)
- **courses**: Course catalog
- **millon_results**: MCMI-II test results with raw responses and calculated scales
- **enrollments**: Course enrollments with status
- **certificates**: PDF certificates for course completion

## Development Setup
1. Frontend runs on port 5000 with Vite dev server
2. Backend runs on port 3001 (set SKIP_DB=true to run without MySQL)

## Production Deployment
Target: AlmaLinux with LiteSpeed + DirectAdmin + MySQL

1. Import `database_setup.sql` via phpMyAdmin
2. Configure `.env` with MySQL credentials
3. Run `npm install && npm start` or use PM2
4. CORS configured for ravankargah.com domains

## Recent Changes
- **2025-12-25**: Initial backend implementation with Express + Sequelize
  - Complete API matching frontend requirements
  - JWT authentication with bcrypt password hashing
  - MCMI-II test scoring service
  - MySQL database schema with Sequelize models
  - PDF certificate upload support

## User Preferences
- Persian (Farsi) RTL interface
- Professional psychology/clinical theme
- Oxford Blue (#002147) and Gold (#F4C700) color scheme
