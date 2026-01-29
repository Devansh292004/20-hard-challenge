# Quick Start Guide - 20 Hard Challenge

## Prerequisites
- Node.js 18+ installed
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Strong willpower ⚡

## Installation (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/Devansh292004/20-hard-challenge.git
cd 20-hard-challenge

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:5173
```

## Quick Setup

### 1. Review Your Profile
The app is pre-configured with:
- **Name**: Devansh
- **Height**: 179 cm
- **Weight**: 80 kg
- **Diet**: Vegetarian (NO EGGS)
- **Timezone**: Asia/Singapore
- **Daily Calorie Target**: 2000-2400 kcal

To customize, edit `src/data/user-profile.json`

### 2. Read the Rules
Before starting, read [`docs/RULES.md`](./docs/RULES.md) completely.

**Key Rules**:
- ✅ 2 workouts per day (30+ mins each)
- ✅ 3.78L water daily
- ✅ Vegetarian Indian meals (compliant)
- ✅ 1 progress photo (daily)
- ✅ 30+ mins reading OR 20+ pages
- ❌ Miss 1 task = Day 1
- ❌ No overrides, no excuses

### 3. Start the Challenge
1. Open http://localhost:5173
2. Click "Start Challenge"
3. Complete all 5 daily tasks
4. Click "Complete Day" at end of day
5. Repeat for 20 consecutive days

## Daily Workflow

### Morning (6-8 AM)
- [ ] Log Workout 1 (Strength)
- [ ] Start water intake tracking
- [ ] Log breakfast (compliance toggle)
- [ ] * [ ] **LOG WEIGHT** (morning, same time) - Must be within ±100g of target

### Afternoon (12-2 PM)
- [ ] Log second meal
- [ ] Continue water tracking
- [ ] Read for 15+ mins

### Evening (5-7 PM)
- [ ] Log Workout 2 (Cardio)
- [ ] Log dinner
- [ ] Upload progress photo

### Night (10-11 PM)
- [ ] Finish water intake (3.78L total)
- [ ] Complete remaining reading
- [ ] Click "Complete Day"

## Testing Locally

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Lint code
npm run lint

# Build for production
npm run build
```

## Troubleshooting

### "Data not persisting"
- Check browser LocalStorage settings
- Ensure cookies/storage not blocked
- Open DevTools → Application → LocalStorage

### "Photos not saving"
- IndexedDB may be disabled
- Check browser storage quota
- Use incognito mode to test

### "Timezone issues"
- Challenge uses Asia/Singapore time
- Days end at 23:59 SGT
- Edit `src/data/user-profile.json` to change timezone

### "Validation failing"
- Check exact requirements in `docs/RULES.md`
- Workout must be ≥30 mins
- Water must be ≥3.78L
- All meals must be marked compliant

## File Structure Reference

```
.
├── docs/
│   ├── README.md              # Overview
│   ├── RULES.md               # Complete rule specification
│   ├── ARCHITECTURE.md        # System design
│   └── DATA_MODEL.md          # JSON schemas
├── src/
│   ├── backend/
│   │   ├── enforcement.js     # ⚡ Core streak logic
│   │   └── validators.js      # Task validation
│   ├── frontend/
│   │   ├── App.jsx            # Main component
│   │   └── components/        # UI components
│   └── data/
│       ├── user-profile.json
│       └── challenge-data.json
├── package.json
├── README.md
└── QUICK_START.md             # This file
```

## Next Steps

1. **Read docs** → `docs/RULES.md` (mandatory)
2. **Understand enforcement** → `docs/ARCHITECTURE.md`
3. **Test locally** → `npm run dev`
4. **Start challenge** → Click "Begin Challenge"
5. **Track daily** → Complete all 5 tasks
6. **Win** → Reach Day 20

## Philosophy

> "This app does not motivate you. It judges you honestly."

There are no easy days. No second chances per day. No special cases. Just code, rules, and discipline.

**You either complete it perfectly, or you restart. There is no middle ground.**

## Support

For issues:
1. Check `docs/` for answers
2. Review `RULES.md` for rule clarifications
3. Test in incognito mode
4. Clear cache and reload
5. Open GitHub issue if still stuck

## Get Started

```bash
npm install && npm run dev
```

🔥 **No more excuses. Start now.**
