# 🔥 20 Hard Challenge - Accountability App

> **This app does not motivate you. It judges you honestly.**

A brutal, discipline-enforced accountability system for the 20 Hard Challenge. Zero loopholes. Automatic failure detection. Ruthless streak resets. Built for personal use with hard-coded Indian vegetarian diet compliance.

## Philosophy

This is NOT a motivational app. It is a tool of merciless accountability.

- **Missed a single task?** Day 1.
- **No manual overrides.** No excuses. No special cases.
- **No gamification fluff.** Just the harsh truth.
- **Every task logged in code.** Cannot be cheated.

## Challenge Rules (Non-Negotiable)

See [`RULES.md`](./docs/RULES.md) for the exact specification.

### Quick Overview
- **2 Workouts per day** (strength + cardio or variation)
- **1 Gallon of water** (3.78L daily minimum)
- **Vegetarian Indian diet** (no meat, NO EGGS, calorie-appropriate)
- **1 Progress photo** (daily, timestamp-verified)
- **Reading/Learning task** (30+ mins or 20+ pages)
- **Streak system**: Current streak, longest streak, failure history
- **Hard deadline**: 23:59 local time each day

**Failure Condition**: Miss ANY task → Day 1 (automatic, instant reset)

## Project Structure

```
.
├── docs/
│   ├── README.md              # This file
│   ├── RULES.md               # Exact challenge specification
│   ├── ARCHITECTURE.md        # System design & enforcement logic
│   ├── DATA_MODEL.md          # JSON schema & validation
│   └── SETUP.md               # Local setup instructions
├── src/
│   ├── backend/
│   │   ├── server.js          # Express server (optional, for expansion)
│   │   ├── enforcement.js     # Core streak & failure detection
│   │   ├── validators.js      # Validation logic for each task
│   │   └── diet-db.json       # Vegetarian Indian diet reference
│   ├── frontend/
│   │   ├── App.js             # Main React component
│   │   ├── components/
│   │   │   ├── DailyChecklist.jsx
│   │   │   ├── WorkoutForm.jsx
│   │   │   ├── DietTracker.jsx
│   │   │   ├── WaterTracker.jsx
│   │   │   ├── PhotoUpload.jsx
│   │   │   ├── ReadingTracker.jsx
│   │   │   ├── StreakDisplay.jsx
│   │   │   └── Analytics.jsx
│   │   ├── styles/
│   │   │   └── dark.css       # Dark mode, minimal design
│   │   └── utils/
│   │       ├── storage.js     # LocalStorage management
│   │       └── datetime.js    # Timezone-aware time
│   └── data/
│       ├── user-profile.json  # Hard-coded personal profile
│       └── challenge-data.json # Daily logs (local only)
├── tests/
│   ├── enforcement.test.js    # Streak reset logic
│   ├── validators.test.js     # Task validation
│   └── data-integrity.test.js # No backdoor loopholes
├── scripts/
│   ├── init.sh                # Initialize local environment
│   └── backup.sh              # Local data backup
├── .gitignore
├── package.json
└── LICENSE
```

## Getting Started

### Prerequisites
- Node.js 18+ (for backend/dev server)
- npm or yarn
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Strong willpower ⚡

### Installation

```bash
# Clone the repository
git clone https://github.com/Devansh292004/20-hard-challenge.git
cd 20-hard-challenge

# Install dependencies
npm install

# Start the development server
npm start

# Open in browser
# http://localhost:3000
```

### Local Setup

See [`docs/SETUP.md`](./docs/SETUP.md) for detailed configuration.

## Core Features

### 🔥 Daily Enforcement Engine
- **Hard deadline**: Tasks must be completed by 23:59 local time
- **Automatic failure detection**: Missing any task = instant Day 1
- **Mandatory confirmation**: Must explicitly confirm day completion
- **No backdoors**: Validation enforced in code, not UI

### 📊 Tracking & Analytics
- **Streak counter**: Current streak + longest streak
- **Calendar heatmap**: GitHub-style contribution view
- **Weight tracking graph**: Monitor body composition changes
- **Water intake graph**: Daily 3.78L compliance visualization
- **Workout frequency chart**: Workout type distribution
- **Failure history log**: Every failed day with reason

### 🥗 Vegetarian Indian Diet System
- **Pre-loaded compliant meals**: Vegetarian Indian recipes (NO eggs)
- **Custom meal entry**: Add meals with compliance toggle
- **Calorie tracking**: Appropriate for 179cm, 80kg, beginner→intermediate fitness
- **Daily notes**: Log hunger, cravings, energy levels
- **Compliance validation**: Only "compliant" meals count as success

### 🏋️ Fitness Tracking
- **Workout logging**: Type, duration, intensity, location
- **Indoor vs outdoor tagging**: Track training variety
- **Progress benchmarks**: Beginner→intermediate progression
- **2-per-day enforcement**: Both workouts must be logged before day end

### 📸 Progress Proof
- **Daily photo requirement**: Timestamp-verified progress photos
- **Local storage**: Photos stored in IndexedDB (not sent anywhere)
- **Timeline comparison**: View side-by-side progress over weeks/months
- **Cannot be faked**: Photo metadata validation

### 📚 Learning/Reading
- **Daily reading confirmation**: Title + pages/minutes
- **Knowledge streak**: Track consecutive days of learning
- **No skipping**: Missing one day resets entire challenge

## Data Model

See [`docs/DATA_MODEL.md`](./docs/DATA_MODEL.md) for complete JSON schema.

### Sample Daily Log

```json
{
  "date": "2026-01-30",
  "day": 15,
  "completed": false,
  "tasks": {
    "workout1": { "logged": true, "type": "strength", "duration": 45, "location": "gym" },
    "workout2": { "logged": false, "type": null, "duration": 0, "location": null },
    "diet": { "compliant": true, "meals": ["idli_sambhar", "dal_rice"], "notes": "" },
    "water": { "liters": 3.78, "logged": true },
    "photo": { "uploaded": false, "timestamp": null },
    "reading": { "logged": false, "title": null, "minutes": 0 }
  }
}
```

## Enforcement Logic

### How Failure is Detected

1. **Time-based**: After 23:59 local time, day status is locked
2. **Task-based**: Any incomplete task = automatic failure
3. **Validation-based**: Tasks must pass strict validation (not just logged)
4. **No overrides**: Admin mode does not exist (could add with explicit code comment)

### How Streaks Work

```
Day 1 (complete) → Day 2 (start) → Day 20 (complete) → ✓ Challenge Won
Day 15 (miss workout 2) → FAIL → Day 1 (restart)
```

### Automatic Reset

When a day fails:
1. Current streak resets to 0
2. Failed day logged with reason
3. UI shows "Challenge Restarted - Day 1"
4. Cannot be undone (no undo button)

## Personal Profile (Hard-coded)

```json
{
  "name": "Devansh",
  "gender": "Male",
  "height_cm": 179,
  "weight_kg": 80,
  "diet": "vegetarian_no_eggs",
  "fitness_level": "beginner_intermediate",
  "goal": "mental_toughness_consistency_discipline",
  "location": "Singapore",
  "timezone": "Asia/Singapore"
}
```

All diet recommendations and fitness progressions are calculated based on this profile.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express (optional, for future sync)
- **Storage**: LocalStorage + IndexedDB (photos)
- **Authentication**: Local only (single user)
- **Styling**: Vanilla CSS (dark mode default)
- **Testing**: Vitest + Jest
- **Deployment**: Static hosting (GitHub Pages, Vercel, Netlify)

## Contributing

This is a personal project, but if you want to use it:

1. Fork the repository
2. Update `src/data/user-profile.json` with your profile
3. Modify `docs/RULES.md` if changing challenge rules
4. Deploy locally or on a personal server

**Note**: Do not share this repo if you're running an active challenge (no cheating).

## Future Roadmap

- [ ] Mobile app (React Native)
- [ ] Cloud sync with end-to-end encryption
- [ ] Multiple user support (team challenges)
- [ ] Custom challenge templates
- [ ] Telegram/Discord bot for daily reminders
- [ ] Calendar export (iCal format)
- [ ] Advanced analytics (ML-based progress prediction)

## License

MIT License - See LICENSE file

## Author

Built by Devansh - A commitment to discipline over motivation.

---

**Remember**: This app enforces discipline, not convenience. If a feature makes the challenge easier, it will not be added.

🔥 **Get started. No more excuses.**
