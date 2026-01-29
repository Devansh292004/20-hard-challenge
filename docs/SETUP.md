# 20 Hard Challenge - Local Setup Guide

## Prerequisites

Before setting up the 20 Hard Challenge locally, ensure you have:

- **Node.js**: Version 18+ (LTS recommended)
  - Download: https://nodejs.org/
  - Verify: `node --version` and `npm --version`
- **npm** or **yarn**: Included with Node.js
- **Git**: For cloning the repository
  - Download: https://git-scm.com/
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **System Requirements**:
  - Minimum 2GB RAM
  - At least 500MB free disk space
  - macOS 10.14+, Windows 10+, or Linux (Ubuntu 18.04+)

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
# or if using yarn
yarn install
```

This will install all required packages from `package.json`:
- React 18
- Vite (build tool)
- Testing libraries (Vitest, Jest)
- ESLint and Prettier (code quality)

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

**File contents** (`.env.local`):

```env
# App Mode
VITE_APP_MODE=development
VITE_LOG_LEVEL=debug

# Data Storage
VITE_STORAGE_TYPE=localStorage
VITE_BACKUP_ENABLED=true

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_EXPORT=true
```

### 4. Update User Profile (Optional)

If you want to customize the user profile:

1. Open `src/data/user-profile.json`
2. Update fields according to your profile:
   - `name`: Your name
   - `height_cm`: Your height
   - `weight_kg`: Your starting weight
   - `location`: Your timezone/location
   - `timezone`: IANA timezone (e.g., "Europe/London", "US/Eastern")

Example modification:

```json
{
  "name": "Your Name",
  "gender": "Male",
  "height_cm": 180,
  "weight_kg": 75,
  "timezone": "US/Eastern",
  "weight_loss_target_kg": 5,
  "daily_weight_loss_rate_kg": 0.25
}
```

### 5. Verify Configuration

Run validation to ensure setup is correct:

```bash
npm run validate
```

This checks:
- Node.js version compatibility
- npm dependencies installed
- Configuration files present
- Directory structure correct
- User profile valid JSON

---

## Running the Application

### Development Mode

```bash
npm run dev
```

This starts:
- Vite development server on `http://localhost:5173`
- Hot module reloading (HMR) for instant code updates
- Debug logging in browser console
- Source maps for easier debugging

**Output**:
```
  VITE v4.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Production Build

```bash
npm run build
```

This creates:
- Optimized production build in `dist/` folder
- Minified JavaScript and CSS
- Source maps (optional)
- Ready for deployment

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

---

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

Automatically re-runs tests when files change.

### Run Tests with Coverage

```bash
npm run test:coverage
```

Generates coverage report showing:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

### Run Specific Test Suite

```bash
npm test -- enforcement.test.js
npm test -- validators.test.js
npm test -- data-integrity.test.js
```

---

## Database Setup

### LocalStorage

Default storage for user data:
- No server required
- Data persists across browser sessions
- Limited to ~5-10MB per origin
- Cleared when cache is cleared

**Location**: Browser DevTools → Application → Local Storage

### IndexedDB

Optional storage for large files (photos):
- Available in all modern browsers
- ~50MB+ per origin (varies by browser)
- More reliable for large data

**Access**: Browser DevTools → Application → IndexedDB

### Data Export/Import

Export challenge data:

```javascript
// In browser console
const data = localStorage.getItem('challenge-session');
const blob = new Blob([data], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'challenge-backup-' + new Date().toISOString() + '.json';
link.click();
```

Import challenge data:

```javascript
// Select and read JSON file from disk
const file = await fetch('challenge-backup-XXXX.json').then(r => r.json());
localStorage.setItem('challenge-session', JSON.stringify(file));
window.location.reload();
```

---

## File Structure

After installation, your project should look like:

```
20-hard-challenge/
├── docs/
│   ├── RULES.md              # Challenge rules specification
│   ├── ARCHITECTURE.md        # System design documentation
│   ├── DATA_MODEL.md          # JSON schemas and data structures
│   ├── SETUP.md              # This file
│   └── README.md             # Main project README
├── src/
│   ├── backend/
│   │   ├── enforcement.js     # Core streak & failure logic
│   │   ├── validators.js      # Task validation functions
│   │   └── weight-tracker.js  # Weight tracking logic
│   ├── frontend/
│   │   ├── App.js            # Main React component
│   │   ├── components/        # React components
│   │   ├── styles/            # CSS stylesheets
│   │   └── utils/             # Utility functions
│   └── data/
│       └── user-profile.json  # User configuration
├── tests/
│   ├── enforcement.test.js
│   ├── validators.test.js
│   └── data-integrity.test.js
├── node_modules/             # Installed dependencies
├── .env.local                # Local environment config
├── .gitignore               # Git ignore rules
├── package.json             # Project metadata & dependencies
├── vite.config.js           # Vite configuration
└── README.md                # Project root README
```

---

## Troubleshooting

### Issue: "Node.js not found"

**Solution**:
- Download Node.js from https://nodejs.org/
- Restart terminal/IDE after installation
- Verify: `node --version`

### Issue: "npm install fails"

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "Port 5173 already in use"

**Solution**:
```bash
# Use different port
npm run dev -- --port 3000

# Or kill process using port 5173
# macOS/Linux:
lsof -i :5173
kill -9 <PID>

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Issue: "Module not found" errors

**Solution**:
```bash
# Ensure all dependencies are installed
npm install

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

### Issue: "Browser shows blank page"

**Solution**:
1. Check browser console for errors (F12 → Console)
2. Clear browser cache and reload
3. Check if `http://localhost:5173` is accessible
4. Ensure no firewall is blocking the connection
5. Restart dev server: `npm run dev`

### Issue: "Data not persisting after refresh"

**Solution**:
1. Check if browser allows localStorage
2. Verify DevTools → Application → Local Storage shows data
3. Ensure browser is not in private/incognito mode
4. Clear browser cache and cookies

---

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/new-feature-name
```

### 2. Make Changes

- Edit files in `src/`
- Changes are hot-reloaded in browser

### 3. Run Tests

```bash
npm test
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: description of changes"
```

### 5. Push and Create PR

```bash
git push origin feature/new-feature-name
```

Then create a Pull Request on GitHub.

---

## Performance Optimization

### Development Performance

- Disable browser extensions that might slow down DevTools
- Use dedicated development profile in browser
- Keep dev server running (don't restart unnecessarily)

### Production Performance

```bash
# Build with optimizations
npm run build

# Analyze bundle size
npm run analyze

# Check for unused code
npm run lint
```

---

## Browser DevTools Tips

### Debugging Challenge Logic

1. Open DevTools: `F12` or `Cmd+Option+I`
2. Go to **Application** tab
3. **Local Storage**: View stored challenge data
4. **Console**: Run debug commands

### Useful Console Commands

```javascript
// View current challenge data
JSON.parse(localStorage.getItem('challenge-session'))

// Clear all data (CAUTION!)
localStorage.clear()

// View user profile
JSON.parse(localStorage.getItem('user-profile'))

// Check current streak
JSON.parse(localStorage.getItem('challenge-session')).streak
```

---

## Next Steps

1. **Read the Rules**: `docs/RULES.md`
2. **Understand the Data Model**: `docs/DATA_MODEL.md`
3. **Start a Challenge**: Open http://localhost:5173
4. **Track Your Progress**: Daily task logging
5. **Export Your Data**: For backup or analysis

---

## Support

- **Issues**: Report bugs in GitHub Issues
- **Documentation**: See other docs/ files
- **FAQ**: Check RULES.md for common questions

---

## Notes

- All data stored locally - no cloud sync
- Perfect for personal accountability
- Hard-coded rules prevent cheating
- 20 days to build discipline

**Good luck with your challenge! 🔥**
