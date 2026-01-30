# 🔥 20 Hard Challenge - Elite Accountability Platform

> **"Discipline is the bridge between goals and accomplishment."**

A professional-grade, luxury-tier accountability system for the 20 Hard Challenge. Designed for high-performers who demand absolute transparency and zero-excuse tracking.

## 💎 The Elite Experience

This platform has been transformed from a personal tracker into a world-class productivity suite.

*   **Luxury UI**: High-contrast "Elite Dark" theme with gold accents and cinematic typography.
*   **Multi-User Support**: Secure account creation and data persistence for multiple challengers.
*   **Performance Analytics**: Interactive Chart.js visualizations for completion trends and consistency scores.
*   **Physique Reporting**: Weight tracking with trend lines, goal progress, and transformation metrics.
*   **Elite Community**: A live activity feed simulating a global network of high-performers.
*   **Brutal Enforcement**: Automated streak failure logic—missed days are detected and logged as failures.

## 🚀 Architecture

Built on a modern, scalable tech stack:

*   **Frontend**: React 18 + Vite for lightning-fast performance.
*   **Backend**: Node.js + Express.js REST API.
*   **Database**: MongoDB (with in-memory fallback for local development).
*   **Security**: JWT (JSON Web Tokens) for secure, stateless authentication.
*   **State Management**: React Context API for global performance tracking.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (optional, fallback included)

### Installation

```bash
# Clone the repository
git clone https://github.com/Devansh292004/20-hard-challenge.git
cd 20-hard-challenge

# Install dependencies
npm install

# Start both Frontend and Backend
npm run dev
```

The app will be available at `http://localhost:5173`. The API runs on `http://localhost:5000`.

## 📜 Challenge Rules (The "Hard" in 20 Hard)

1.  **Two Workouts**: 45 minutes each, one MUST be outdoors.
2.  **Clean Diet**: Follow a strict nutrition plan. No cheat meals.
3.  **Hydration**: Drink 1 gallon (3.78L) of water daily.
4.  **Learning**: Read 10+ pages of a non-fiction/educational book.
5.  **Proof**: Take a daily progress photo.
6.  **Failure**: Miss ONE task? **Reset to Day 1.** No exceptions.

## 📈 Key Features

*   **Personal Dashboard**: Real-time streak tracking and daily objective checklist.
*   **Advanced Analytics**: Deep dives into your performance history with interactive graphs.
*   **Physique Tracker**: Monitor your physical transformation with weight trends and progress stats.
*   **Elite Community**: Stay motivated with a global feed of achievements and community statistics.
*   **Adaptive Backend**: Automatically handles local development or cloud deployment with MongoDB or Persistent File Storage.

## 📂 Project Structure

```
.
├── src/
│   ├── backend/          # Express API, Auth, and Enforcement logic
│   ├── frontend/         # React components, pages, and luxury styles
│   ├── models/           # Mongoose schemas for Users and Challenges
│   └── main.jsx          # Frontend entry point
├── tests/                # Unit and Integration tests
├── docs/                 # Detailed documentation
└── package.json          # Project configuration
```

## 🤝 Contributing

We welcome contributions to make the challenge even more effective. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---
**Build Discipline. Embrace the Hard.** 🔥
