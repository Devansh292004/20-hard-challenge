# Elite Accountability Platform - Setup Guide

## Prerequisites

- **Node.js**: Version 18+ (LTS)
- **npm**: Version 9+
- **MongoDB**: (Optional) Local installation or MongoDB Atlas URI.
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge.

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/Devansh292004/20-hard-challenge.git
cd 20-hard-challenge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/20hard
JWT_SECRET=your_luxury_secret_key_here
NODE_ENV=development
```
*Note: If `MONGODB_URI` is not provided, the app will gracefully fallback to in-memory storage for development.*

### 4. Start the Application
```bash
# Start both Frontend (Vite) and Backend (Express)
npm run dev
```

---

## Running with Docker
```bash
# Build the image
docker build -t 20-hard-elite .

# Run the container
docker run -p 5000:5000 20-hard-elite
```

---

## Troubleshooting

### Port 5173 or 5000 already in use
```bash
# Kill process on port 5173 (macOS/Linux)
kill $(lsof -t -i :5173)

# Kill process on port 5000
kill $(lsof -t -i :5000)
```

### MongoDB Connection Issues
The app is designed to be resilient. If it cannot connect to MongoDB, you will see a warning in the server logs, and the app will use an in-memory database. This is perfect for quick testing but data will not persist across server restarts.

---
**Build Discipline. Embrace the Hard.** 🔥
