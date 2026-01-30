# Elite Accountability Platform Architecture

## Overview

The 20 Hard Challenge app is a professional-grade discipline-enforcement system. The architecture has been modernized into a full-stack React application with a Node.js/Express backend.

### Key Pillars
1. **Validation-first design**: All performance metrics are validated on the server.
2. **Stateless Authentication**: JWT-based security for multi-user support.
3. **Elite Performance Aesthetic**: A high-end dark theme with gold accents for a premium feel.
4. **Resilient Data Layer**: Mongoose-based MongoDB persistence with in-memory fallbacks.

## Tech Stack

**Frontend**:
- **React 18**: Component-based UI for dynamic state management.
- **Vite**: Ultra-fast build tool and development server.
- **Chart.js**: Professional analytics and trend visualization.
- **React Context API**: Global state management for challenge data.
- **CSS Variables**: System-wide "Elite Dark" theme with gold accents.

**Backend**:
- **Node.js + Express**: RESTful API for user management and performance tracking.
- **JWT (JSON Web Tokens)**: Secure, stateless authentication and session management.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **Bcrypt.js**: High-security password hashing.

**DevOps & Infrastructure**:
- **GitHub Actions**: CI/CD pipeline for automated testing and builds.
- **Docker**: Containerization for consistent deployment.
- **Vite/Build**: Optimized production assets.

## System Design

### 1. Authentication Flow
```
User Signs Up/Logs In
    ↓
Backend validates credentials
    ↓
JWT Token generated and returned
    ↓
Frontend stores token in LocalStorage
    ↓
Subsequent requests include JWT in Authorization Header
```

### 2. Performance Tracking
```
User updates daily checklist
    ↓
Frontend validates basic inputs
    ↓
API call to /api/challenge/update
    ↓
Backend Enforcement Engine processes data
    ↓
Streak and success status calculated
    ↓
Database updated and result returned to UI
```

## Core Modules

### Enforcement Engine (`src/backend/enforcement.js`)
Controls the ruthless streak system. Any failure to complete all tasks before the daily deadline results in an automatic reset to Day 1.

### Luxury UI System (`src/frontend/styles.css`)
Custom "Elite Performance" branding:
- **Primary Background**: `#0f0f1e` (Deep Midnight)
- **Accent**: `#daa520` (Goldenrod/Gold)
- **Typography**: Playfair Display (Headings) + Inter (UI)

## Deployment Preparation

The app is containerized via `Dockerfile` and ready for deployment to:
- **Frontend**: Vercel, Netlify, or AWS Amplify.
- **Backend**: Render, Railway, Heroku, or DigitalOcean App Platform.
- **Database**: MongoDB Atlas.

---
**Elite Performance. Zero Compromise.**
