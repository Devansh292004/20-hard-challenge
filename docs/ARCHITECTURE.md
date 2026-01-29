# System Architecture

## Overview

The 20 Hard Challenge app is a discipline-enforcement system with zero tolerance for loopholes. The architecture prioritizes:

1. **Validation-first design**: All inputs validated before persistence
2. **Immutable enforcement rules**: Hard-coded, cannot be bypassed via UI
3. **Time-based lockdown**: Days lock at 23:59, no retroactive changes
4. **Single source of truth**: JSON-based local storage, no sync complications

## Tech Stack

**Frontend**:
- React 18 (component-based UI)
- Vite (fast dev server)
- Vanilla CSS (dark mode default)
- IndexedDB (photo storage, local only)

**Backend**:
- Node.js + Express (optional, for future cloud sync)
- LocalStorage API (current state)
- Filesystem (persistent data)

**Testing**:
- Vitest (unit tests)
- Jest (integration tests)
- Manual end-to-end testing

## Layered Architecture

```
┌─────────────────────────────────────┐
│   React UI Layer (Components)       │
├─────────────────────────────────────┤
│   Validation & Business Logic       │
│   (enforcement.js, validators.js)   │
├─────────────────────────────────────┤
│   Data Storage Layer                │
│   (LocalStorage + IndexedDB)        │
├─────────────────────────────────────┤
│   Persistent Data (JSON)            │
│   (challenge-data.json)             │
└─────────────────────────────────────┘
```

## Core Modules

### 1. Enforcement Engine (`src/backend/enforcement.js`)

**Purpose**: Controls streak system and automatic failure detection

**Key Functions**:

```javascript
validateDayCompletion(dayData) {
  // Checks all 5 tasks
  // Returns { valid: bool, failureReason: string }
}

processDayEnd(completedDay) {
  // Called at 23:59
  // If validation fails: currentStreak = 0
  // Logs failure to history
}

getStreakStatus() {
  // Returns { current: number, longest: number, history: [] }
}
```

**Validation Flow**:
```
User clicks "Complete Day"
    ↓
validateDayCompletion() called
    ↓
Check all 5 tasks
    ├─ Workout 1 logged? ✓/✗
    ├─ Workout 2 logged? ✓/✗
    ├─ Water >= 3.78L? ✓/✗
    ├─ Diet compliant? ✓/✗
    ├─ Reading 30+ mins? ✓/✗
    └─ Photo uploaded? ✓/✗
    ↓
Any failure?
    ├─ YES → currentStreak = 0, log failure, show "Day 1"
    └─ NO → currentStreak++, show "Day X Complete"
    ↓
Persist to storage
```

### 2. Validators Module (`src/backend/validators.js`)

**Purpose**: Task-specific validation logic

**Functions**:

```javascript
validateWorkout(workout) {
  // ✓ Type is 'strength' or 'cardio'
  // ✓ Duration >= 30 mins
  // ✓ Intensity provided
  // ✓ Location provided
}

validateWater(waterIntake) {
  // ✓ Total liters >= 3.78
  // ✓ Only pure water / unsweetened tea
}

validateDiet(mealLog) {
  // ✓ User marked as 'compliant'
  // ✓ Vegetarian Indian food
  // ✓ No eggs
}

validatePhoto(photo) {
  // ✓ File exists
  // ✓ Timestamp within same day
  // ✓ Not a duplicate of previous photo
}

validateReading(reading) {
  // ✓ Minutes >= 30 OR pages >= 20
  // ✓ Title provided
}
```

### 3. Storage Layer (`src/frontend/utils/storage.js`)

**Purpose**: Manage persistent data (LocalStorage + IndexedDB)

**API**:

```javascript
// Get current challenge data
getChallengeData() → { currentDay, currentStreak, history, tasks }

// Save day's progress
saveDayData(day, taskData) → void

// Upload progress photo (IndexedDB)
storePhoto(dayNumber, photoBlob) → Promise
getPhoto(dayNumber) → Promise<Blob>

// Get failure history
getFailureHistory() → [{ date, day, reason }]
```

### 4. React Components

**Structure**:

```
App.js (main)
├─ DailyChecklist.jsx
│  ├─ WorkoutForm.jsx
│  ├─ DietTracker.jsx
│  ├─ WaterTracker.jsx
│  ├─ PhotoUpload.jsx
│  └─ ReadingTracker.jsx
├─ StreakDisplay.jsx
├─ Analytics.jsx
│  ├─ CalendarHeatmap.jsx
│  ├─ WeightChart.jsx
│  └─ FailureHistory.jsx
└─ SettingsPanel.jsx
```

## Data Models

### Challenge Data Schema

```json
{
  "metadata": {
    "version": "1.0",
    "startDate": "2026-01-30",
    "timezone": "Asia/Singapore"
  },
  "profile": {
    "name": "Devansh",
    "height_cm": 179,
    "weight_kg": 80,
    "diet": "vegetarian_no_eggs"
  },
  "streakData": {
    "currentDay": 1,
    "currentStreak": 0,
    "longestStreak": 0,
    "dayStartedAt": "2026-01-30T00:00:00+08:00"
  },
  "dailyLogs": [
    {
      "date": "2026-01-30",
      "day": 1,
      "status": "pending",
      "tasks": {
        "workout": [{ type, duration, intensity, location }],
        "water": { liters: 0 },
        "diet": [{ meal, compliant }],
        "photo": { stored: false, timestamp: null },
        "reading": { minutes: 0, pages: 0, title: null }
      },
      "completedAt": null
    }
  ],
  "failureHistory": [
    { date, day, reason: "missed_workout_2" }
  ]
}
```

## Enforcement Points

### 1. Time-Based Lockdown

```javascript
// Checked every minute
if (now.getHours() === 23 && now.getMinutes() === 59) {
  // Lock day, prevent new entries
  // Auto-validate and fail if incomplete
}
```

### 2. Validation on Submission

```javascript
// Before day is marked complete
const canCompleteDay = (
  workout1.logged &&
  workout2.logged &&
  water.liters >= 3.78 &&
  dietCompliant &&
  photo.uploaded &&
  reading.minutes >= 30
);
```

### 3. No Backdoors

- Cannot edit past days
- Cannot retroactively log tasks
- Cannot reset streak manually
- Cannot override validation rules via UI
- All business logic in validation layer, not UI

## State Management

Use React Context + Hooks (no Redux needed for single user):

```javascript
const ChallengeContext = createContext({
  currentDay: 1,
  currentStreak: 0,
  tasksForToday: {},
  updateTask: (taskType, data) => {},
  completeDay: () => {},
  getStatus: () => {}
});
```

## Photo Storage Strategy

**Why IndexedDB?**
- Local only, never uploaded
- Can store large files (BlOBs)
- Persists across browser sessions
- Cannot be accidentally synced

**Flow**:
```
User uploads photo
    ↓
Validate timestamp (same day)
    ↓
Compress image (if needed)
    ↓
Store in IndexedDB with dayNumber as key
    ↓
UI shows thumbnail
    ↓
On export: bundle IndexedDB as ZIP
```

## Testing Strategy

### Unit Tests
- Validator logic: test each task validation independently
- Streak reset: test day failure scenarios
- Time-based: test 23:59 lockdown behavior

### Integration Tests
- Full day completion flow
- Failure scenarios (missing 1 task)
- Data persistence across page reload

### Manual Testing
- UI responsiveness on mobile
- Photo upload on different browsers
- Dark mode contrast

## Deployment

**Option 1: Static Host (Vercel / Netlify)**
- `npm run build` → build/ folder
- Deploy static files
- Data stored in browser LocalStorage

**Option 2: Self-hosted**
- Node.js server (optional)
- Serve React build
- Optional database for future multi-user

## Future Extensions

### Mobile App
- React Native for iOS/Android
- Native photo camera integration
- Push notifications for deadlines

### Cloud Sync
- End-to-end encrypted sync
- Server never sees raw data
- Optional: backup to personal server

### Multi-user
- Team challenges
- Leaderboards (anonymized)
- Shared accountability groups

## Security Notes

- No authentication needed (single user)
- No data leaves the device
- Browser LocalStorage is sufficient
- Consider adding data export for backup

## Performance Optimizations

- Lazy load analytics
- Memoize streak calculations
- Debounce form inputs
- Batch photo compression
- IndexedDB queries paginated
