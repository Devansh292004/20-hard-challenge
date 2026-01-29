# 20 Hard Challenge - Data Model

## Overview

This document describes the JSON schema and data structures used throughout the 20 Hard Challenge application.

## User Profile (Immutable)

**File**: `src/data/user-profile.json`

The user profile is loaded at app startup and remains constant throughout a challenge run. Cannot be modified during an active challenge.

```json
{
  "name": "Devansh",
  "gender": "Male",
  "height_cm": 179,
  "weight_kg": 80,
  "diet_type": "vegetarian_no_eggs",
  "fitness_level": "beginner_intermediate",
  "goal": "mental_toughness_consistency_discipline",
  "location": "Singapore",
  "timezone": "Asia/Singapore",
  "challenge_start_date": "TBD",
  "daily_calorie_target": "2000-2400",
  "workout_intensity_level": "moderate_to_high",
  "weight_loss_target_kg": 5,
  "weight_target_start_kg": 80,
  "weight_target_end_kg": 75,
  "daily_weight_loss_rate_kg": 0.25
}
```

### Field Descriptions

- **name**: User's first name
- **gender**: User's gender (Male/Female/Other)
- **height_cm**: Height in centimeters (affects calorie calculations)
- **weight_kg**: Starting weight in kilograms
- **diet_type**: Diet classification (vegetarian_no_eggs)
- **fitness_level**: Fitness level (beginner_intermediate, intermediate, advanced)
- **goal**: Challenge goal statement
- **location**: User's current location
- **timezone**: IANA timezone identifier (e.g., Asia/Singapore)
- **challenge_start_date**: ISO 8601 date (YYYY-MM-DD) or "TBD"
- **daily_calorie_target**: Calorie range as string (e.g., "2000-2400")
- **workout_intensity_level**: Workout intensity (light, moderate, moderate_to_high, high)
- **weight_loss_target_kg**: Total weight to lose over 20 days
- **weight_target_start_kg**: Starting weight (same as weight_kg)
- **weight_target_end_kg**: Target weight after 20 days
- **daily_weight_loss_rate_kg**: Expected daily weight loss (e.g., 0.25kg/day for 5kg over 20 days)

---

## Daily Challenge Log

**Storage**: `localStorage` or `IndexedDB` (depending on data size)

**File naming** (for export): `challenge-data-YYYY-MM-DD.json`

### Complete Daily Log Schema

```json
{
  "date": "2026-01-30",
  "day": 15,
  "status": "completed",
  "timestamp_created": "2026-01-30T00:00:00+08:00",
  "timestamp_completed": "2026-01-30T23:45:32+08:00",
  "tasks": {
    "workout1": {
      "logged": true,
      "type": "strength",
      "duration_minutes": 45,
      "intensity": "high",
      "location": "gym",
      "notes": "Upper body - bench press, squats",
      "timestamp": "2026-01-30T06:30:00+08:00"
    },
    "workout2": {
      "logged": true,
      "type": "cardio",
      "duration_minutes": 35,
      "intensity": "moderate",
      "location": "outdoor",
      "notes": "Running - 5km",
      "timestamp": "2026-01-30T18:30:00+08:00"
    },
    "diet": {
      "logged": true,
      "compliant": true,
      "meals": [
        "dal_rice",
        "roti_sabzi",
        "paneer_curry"
      ],
      "meal_count": 3,
      "notes": "Good energy levels, no cravings",
      "calorie_estimate": 2150,
      "is_within_target": true
    },
    "water": {
      "logged": true,
      "liters": 3.78,
      "is_target_met": true,
      "notes": "On track throughout day"
    },
    "photo": {
      "logged": true,
      "filename": "progress_day15_20260130.jpg",
      "timestamp": "2026-01-30T08:00:00+08:00",
      "file_size_bytes": 245000,
      "notes": "Front-facing, full torso",
      "metadata_validated": true
    },
    "reading": {
      "logged": true,
      "title": "Atomic Habits",
      "minutes": 45,
      "pages_read": 25,
      "is_target_met": true,
      "notes": "Chapter 3: Identity-based habits"
    },
    "weight": {
      "logged": true,
      "weight_kg": 79.75,
      "expected_weight_kg": 79.75,
      "variance_kg": 0,
      "within_tolerance": true,
      "timestamp": "2026-01-30T07:15:00+08:00",
      "notes": "Fasting weight, morning measurement"
    }
  },
  "streak": {
    "current": 15,
    "longest_ever": 15
  },
  "day_summary": {
    "all_tasks_complete": true,
    "day_status": "success",
    "failure_reason": null,
    "completed_at": "2026-01-30T23:45:32+08:00"
  }
}
```

### Task Field Descriptions

#### Workout Fields

- **logged**: Boolean - task was logged
- **type**: "strength" | "cardio" | "hiit" | "yoga" etc.
- **duration_minutes**: Integer - workout duration
- **intensity**: "light" | "moderate" | "high"
- **location**: "gym" | "home" | "outdoor"
- **notes**: String - user notes
- **timestamp**: ISO 8601 timestamp of workout

#### Diet Fields

- **logged**: Boolean - meal was logged
- **compliant**: Boolean - meal meets vegetarian Indian requirements
- **meals**: Array of meal IDs (e.g., "dal_rice", "paneer_curry")
- **meal_count**: Integer - number of meals logged
- **notes**: String - hunger, energy, cravings
- **calorie_estimate**: Integer - estimated calories
- **is_within_target**: Boolean - within daily calorie range

#### Water Fields

- **logged**: Boolean - water intake was logged
- **liters**: Number - total liters consumed
- **is_target_met**: Boolean - >= 3.78L
- **notes**: String - user notes

#### Photo Fields

- **logged**: Boolean - photo was uploaded
- **filename**: String - stored filename
- **timestamp**: ISO 8601 timestamp of photo
- **file_size_bytes**: Integer - photo file size
- **notes**: String - photo description
- **metadata_validated**: Boolean - timestamp verified

#### Reading Fields

- **logged**: Boolean - reading was logged
- **title**: String - book/resource title
- **minutes**: Integer - minutes spent reading
- **pages_read**: Integer - pages read today
- **is_target_met**: Boolean - >= 30 mins OR >= 20 pages
- **notes**: String - what was read

#### Weight Fields

- **logged**: Boolean - weight was logged
- **weight_kg**: Number - current weight
- **expected_weight_kg**: Number - target weight for day
- **variance_kg**: Number - difference from expected
- **within_tolerance**: Boolean - within ±0.1kg
- **timestamp**: ISO 8601 timestamp of weigh-in
- **notes**: String - fasting/fed, time of day

---

## Validation Rules

### Day Status Values

- `"pending"` - Day started, not yet completed
- `"completed"` - All tasks done, day submitted
- `"failed"` - Task validation failed, streak reset

### Failure Conditions

A day is automatically marked as `"failed"` if ANY of these occur:

1. **Workouts**: Both not logged OR duration < 30 mins each
2. **Diet**: Non-compliant meal logged OR no meals logged
3. **Water**: < 3.78L logged
4. **Photo**: Not uploaded OR metadata validation fails
5. **Reading**: < 30 mins AND < 20 pages
6. **Weight**: Not logged OR variance > ±0.1kg
7. **Time**: Task not completed by 23:59 local time

---

## Challenge Session Data

**Structure**: Single challenge run contains all daily logs

```json
{
  "session_id": "20260130_devansh_challenge",
  "session_start_date": "2026-01-30",
  "session_day_started": 1,
  "days": [
    { "date": "2026-01-30", "day": 1, ... },
    { "date": "2026-01-31", "day": 2, ... },
    ...
  ],
  "statistics": {
    "days_completed": 15,
    "days_failed": 2,
    "current_streak": 15,
    "longest_streak": 15,
    "total_workouts": 30,
    "total_water_liters": 56.7,
    "average_weight": 79.87,
    "total_reading_minutes": 675,
    "compliance_percentage": 88.2
  }
}
```

---

## Storage Strategy

### LocalStorage

- User profile (immutable)
- Daily logs (serialized JSON)
- Streak data
- Session metadata

### IndexedDB

- Progress photos (large binary data)
- High-resolution images
- Backup of daily logs

### No Cloud Storage

- All data stored locally on device
- No syncing to cloud servers
- No sharing of user data
- Privacy-first design

---

## Data Export

**Format**: JSON export of complete challenge session

**Filename pattern**: `challenge-session-YYYY-MM-DD.json`

**Usage**: For backup, analysis, or sharing within local context

---

## Backward Compatibility

- Schema version: `1.0`
- If schema changes, version will be incremented
- Migration logic will handle old format
- Always validate before loading

---

## Notes

- All timestamps are ISO 8601 with timezone
- All weights in kilograms
- All distances in kilometers
- All durations in minutes
- All dates in YYYY-MM-DD format
- Boolean fields use `true`/`false` (not 0/1)
