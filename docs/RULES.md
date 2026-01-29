# 20 Hard Challenge - Exact Rules

## Challenge Objective

Complete 20 consecutive days of disciplined adherence to the 20 Hard Challenge. One missed task = automatic restart to Day 1.

## Daily Requirements (All Non-Negotiable)

Every requirement must be completed by 23:59 local time (Asia/Singapore) to mark the day as successful.

### 1. Fitness: 2 Workouts Per Day

**Requirement**:
- 2 distinct workouts per calendar day
- Minimum 30 minutes each
- One must be strength-based, one cardio-based (or equivalent variation)
- Can be gym, home, or outdoor

**Validation Rules**:
- `Strength`: Resistance training, weightlifting, calisthenics, yoga, Pilates
- `Cardio`: Running, cycling, swimming, rowing, HIIT, sports, jump rope
- Both must be logged with: type, duration (minutes), intensity (light/moderate/high), location (gym/home/outdoor)
- Cannot count same workout twice (e.g., 2 running sessions do NOT count)
- Must be recorded by 23:59, no retroactive logging after day ends
- Minimum 30 mins each, no "5-minute walk" loopholes

**Failure Condition**: Missing 1 or both workouts = Day 1

---

### 2. Water: 1 Gallon (3.78L) Daily

**Requirement**:
- 3.78 liters of pure water minimum per day
- Can include green tea, black tea (unsweetened), but NOT: coffee, juice, soda, energy drinks, alcohol
- Track total liters consumed

**Validation Rules**:
- Must log total in app before 23:59
- No guessing: use a marked bottle or measuring cup
- App shows daily target: 3780mL
- Can space throughout day
- Does NOT include food moisture (soups, fruits)

**Failure Condition**: < 3.78L logged = Day 1

---

### 3. Diet: Vegetarian Indian, NO EGGS

**Requirement**:
- All meals must be vegetarian Indian cuisine
- Absolutely NO eggs (no omelets, scrambles, hard-boiled)
- Calorie range: 2000-2400 kcal/day (adjusted for 179cm, 80kg, beginner→intermediate fitness)
- Every meal logged as "compliant" or "non-compliant"

**Compliant Foods** (examples):
- Dal (lentil curries): chana dal, moong dal, urad dal
- Rice dishes: Basmati, brown rice, pulao (vegetable only)
- Roti/Naan (whole wheat preferred)
- Vegetables: all types, cooked or raw
- Paneer (cottage cheese): curries, grilled
- Tofu (as meat substitute)
- Legumes: chickpeas, kidney beans, peanuts
- Nuts: almonds, cashews (portion controlled)
- Yogurt (unsweetened, vegetarian)
- Fruits: all fresh fruits
- Spices: turmeric, cumin, ginger, chili (all OK)

**Non-Compliant Foods**:
- Meat, fish, poultry (obviously)
- Eggs in ANY form
- Cheese (except paneer)
- Processed/packaged snacks (chips, cookies)
- Fried foods (samosas, pakoras)
- Added sugar desserts (regular sweets, ice cream)
- Alcohol

**Validation Rules**:
- User manually logs each meal as "Compliant" or "Non-Compliant"
- Must have at least 1 meal per day
- App should warn but NOT auto-reject (user is accountable)
- Daily notes section: optional but encouraged for hunger/energy tracking

**Failure Condition**: Logging non-compliant meal = entire day marked as FAILED

---

### 4. Progress Photo: 1 Daily, Timestamp-Verified

**Requirement**:
- 1 photo per day showing current physical state
- Front-facing, full torso minimum (can include more)
- Same location, time, and outfit each day (for consistency)
- Timestamp must be within same calendar day
- Stored locally (IndexedDB), never uploaded to cloud

**Validation Rules**:
- Photo must have device timestamp
- Must be uploaded before 23:59
- Cannot be screenshot or copy of old photo
- App validates metadata if possible
- File size: any (stored locally)

**Failure Condition**: No photo uploaded by 23:59 = Day 1

---

### 5. Reading / Learning: 30+ Minutes OR 20+ Pages

**Requirement**:
- Either 30+ minutes of reading/learning OR 20+ pages
- Can be: books, academic papers, technical documentation, coding tutorials, educational videos
- Cannot be: social media, news scrolling, reddit threads, email

**Validation Rules**:
- Log title of book/resource
- Log pages read OR minutes spent (choose one or both)
- If minutes: must be active reading (not passive listening)
- App shows daily target: 30 mins OR 20 pages
- Can split across multiple sessions

**Failure Condition**: < 30 mins OR < 20 pages = Day 1

---

### 6. Daily Weight Tracking: 5kg Target Loss (80→75kg)

**Requirement**:

* Daily weigh-in (morning, same time, same conditions)
* Target: Reduce from 80kg to 75kg over 20 days
* Daily target weight: 80kg - (0.25kg × day_number)
* Allowed variance: ±100g from expected weight
* Must be logged before 23:59 each day

**Validation Rules**:

* App calculates expected weight based on linear progression (0.25kg/day loss)
* Weigh-in must be within ±100g of expected target
* Missing weigh-in = Day 1
* Weight gain beyond 100g variance = Day 1
* Daily deficit required: ~1925 kcal (based on BMR + activity)
* App tracks trend: must show downward trajectory overall
* BMI monitoring: ensures healthy weight loss rate
* Calorie estimation: provides daily deficit guidance

**Failure Condition**: No weigh-in OR weight exceeds variance = Day 1

---


## Streak System

### Current Streak
- Counts consecutive days from Day 1
- Resets to 0 on any task failure
- Shows on dashboard prominently

### Longest Streak
- All-time highest streak achieved
- Never resets (for motivation tracking)
- Saved in persistent storage

### Failure History
- Logs every failed day with: date, day number, reason (which task failed)
- Used to identify weakness patterns
- Cannot be edited or deleted

---

## Daily Enforcement Logic

### Time-Based
- Day starts: 00:00 local time
- Day deadline: 23:59 local time
- At 23:59:59, day is locked
- No retroactive logging allowed

### Completion Confirmation
- User must explicitly click "Complete Day" button
- App validates all 5 tasks
- If any task incomplete: shows error, day not submitted
- If all tasks complete: shows "Day X Complete"

### Automatic Failure Detection
- App checks every task before day submission
- If validation fails on any task: `current_streak = 0`, logs failure reason
- UI shows: "Day X Failed - Challenge Restarted to Day 1"
- No undo/retry button

---

## Challenge Win Condition

Successfully complete all 20 days with:
- All 5 tasks logged every single day
- No task failures
- Current streak reaches 20

Upon Day 20 completion: **"Challenge Complete - You've Proved Your Discipline" badge + streak history**

---

## Rules Modifications

These rules are HARD-CODED into the app. To modify:
1. Edit this file (`docs/RULES.md`)
2. Update validation logic in `src/backend/validators.js`
3. Update UI/UX in React components
4. Document reason for change
5. Commit with message: `refactor: update challenge rules - reason`

**Note**: Do not modify rules mid-challenge (it's cheating).

---

## Personal Profile (Immutable)

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
  "workout_intensity_level": "moderate_to_high"
}
```

All diet, fitness, and tracking parameters are based on this profile. Profile is hard-coded at app start and cannot be changed during a running challenge.

---

## FAQ - Common Loopholes Blocked

**Q: Can I count stretching as a workout?**
A: No. Must be 30+ mins of elevated heart rate (cardio) or resistance.

**Q: Can I drink coffee for the water intake?**
A: No. Only pure water, unsweetened tea. Coffee is a separate beverage.

**Q: Can I eat paneer butter masala with butter/cream?**
A: Yes, if ingredients are vegetarian. Use app's "compliant" toggle honestly.

**Q: Can I upload yesterday's photo today?**
A: No. Photo metadata checked. If you missed yesterday, that day failed.

**Q: Can I read social media posts about technology for learning?**
A: No. Must be structured learning: books, courses, documentation.

**Q: Can I skip a day and come back the next day?**
A: No. Missing even 1 hour means that day is incomplete. Streak resets.

**Q: Can admin override a failed day?**
A: No. There is no admin mode. Code is law.

---

## Enforcement Philosophy

This app enforces discipline, not convenience.
- No excuses in the code
- No special cases
- No recovery mechanisms
- No user can bypass validation

**The challenge is meant to be hard.** That's the entire point.

🔥 **You either complete it perfectly, or you restart. There is no middle ground.**
