# Implementation Tasks

## Overview
This document outlines all tasks required to implement the 1RM Calculator application, following TDD and SOLID principles.

---

## Phase 1: Project Setup & Infrastructure

### 1.1 Initialize Project
- [ ] Run `npm init -y` to create package.json
- [ ] Install Vite: `npm install -D vite`
- [ ] Install Vitest: `npm install -D vitest`
- [ ] Install ESLint: `npm install -D eslint`
- [ ] Install Prettier: `npm install -D prettier`
- [ ] Install Husky: `npm install -D husky`
- [ ] Install Autoprefixer: `npm install -D autoprefixer`
- [ ] Install PostCSS: `npm install -D postcss`
- [ ] Add scripts to package.json (dev, build, test, lint, format)
- [ ] Create directory structure: `src/`, `src/modules/`, `src/utils/`, `src/styles/`, `tests/`

### 1.2 Configure Build Tools
- [ ] Create `vite.config.js` with base path for GitHub Pages
- [ ] Configure Vite build output directory (dist)
- [ ] Configure Vite terser minification options
- [ ] Create `tailwind.config.js` with content paths
- [ ] Add custom colors to Tailwind config (primary, background-dark, etc.)
- [ ] Add custom font family (Lexend) to Tailwind config
- [ ] Add custom border radius values to Tailwind config
- [ ] Add fadeIn animation keyframes to Tailwind config
- [ ] Create `postcss.config.js` with Tailwind and Autoprefixer
- [ ] Create `.eslintrc.json` with ES2022 environment
- [ ] Add ESLint rules (no-console, no-unused-vars, prefer-const)
- [ ] Create `.prettierrc.json` with formatting preferences
- [ ] Run `npx husky install` to initialize Husky
- [ ] Create `.husky/pre-commit` hook to run tests before commit

### 1.3 Setup GitHub Actions
- [ ] Create `.github/workflows/` directory
- [ ] Create `deploy.yml` workflow file
- [ ] Add checkout step (actions/checkout@v4)
- [ ] Add Node.js setup step (actions/setup-node@v4, version 20)
- [ ] Add npm ci step for dependency installation
- [ ] Add npm test step
- [ ] Add npm run lint step
- [ ] Add npm run build step
- [ ] Add GitHub Pages deployment step (peaceiris/actions-gh-pages@v3)
- [ ] Configure workflow to run on push to main branch
- [ ] Test workflow with dummy commit

### 1.4 Create Base HTML Structure
- [ ] Create `index.html` with semantic structure
- [ ] Add Google Fonts (Lexend)
- [ ] Add Material Symbols icons
- [ ] Set up dark mode class
- [ ] Create responsive meta tags

---

## Phase 2: Core Logic Implementation (TDD)

### 2.1 Constants Module
**File**: `src/utils/constants.js`

- [ ] **Test**: Write tests for exercise definitions structure
- [ ] **Implement**: Define `EXERCISES` object with all 4 exercises
- [ ] **Test**: Write tests for conversion factors
- [ ] **Implement**: Define `CONVERSION_FACTORS` object
- [ ] **Test**: Write tests for formula constants
- [ ] **Implement**: Define `FORMULA_CONSTANTS` object
- [ ] **Refactor**: Ensure all constants are immutable (Object.freeze)

### 2.2 Calculator Module
**File**: `src/modules/calculator.js`

#### 2.2.1 Calculate 1RM
- [ ] **Test**: Write test for basic Epley formula (100 lbs, 5 reps → 116.67)
- [ ] **Test**: Write test for 1 rep (should return weight × 1.033)
- [ ] **Test**: Write test for 10 reps
- [ ] **Test**: Write test for edge case (0 weight, negative reps)
- [ ] **Implement**: `calculate1RM(weight, reps)` function
- [ ] **Refactor**: Extract formula constant

#### 2.2.2 Calculate Percentages
- [ ] **Test**: Write test for 90% calculation
- [ ] **Test**: Write test for 80% calculation
- [ ] **Test**: Write test for 70% calculation
- [ ] **Test**: Write test for custom percentage
- [ ] **Implement**: `calculatePercentage(oneRM, percentage)` function
- [ ] **Refactor**: Ensure precision handling

#### 2.2.3 Unit Conversion
- [ ] **Test**: Write test for lbs to kg conversion
- [ ] **Test**: Write test for kg to lbs conversion
- [ ] **Test**: Write test for same unit (should return same value)
- [ ] **Test**: Write test for invalid unit (should throw error)
- [ ] **Implement**: `convertUnit(value, from, to)` function
- [ ] **Refactor**: Use constants for conversion factors

#### 2.2.4 Format Result
- [ ] **Test**: Write test for formatting to 1 decimal place
- [ ] **Test**: Write test for rounding behavior
- [ ] **Test**: Write test for very large numbers
- [ ] **Implement**: `formatResult(value)` function
- [ ] **Refactor**: Consider locale formatting

### 2.3 Validators Module
**File**: `src/utils/validators.js`

#### 2.3.1 Validate Weight
- [ ] **Test**: Write test for valid weight (positive number)
- [ ] **Test**: Write test for zero weight (invalid)
- [ ] **Test**: Write test for negative weight (invalid)
- [ ] **Test**: Write test for non-numeric input (invalid)
- [ ] **Implement**: `validateWeight(weight)` function

#### 2.3.2 Validate Reps
- [ ] **Test**: Write test for valid reps (1-50)
- [ ] **Test**: Write test for zero reps (invalid)
- [ ] **Test**: Write test for negative reps (invalid)
- [ ] **Test**: Write test for reps > 50 (warning)
- [ ] **Implement**: `validateReps(reps)` function

#### 2.3.3 Validate Input
- [ ] **Test**: Write test for valid weight + reps combination
- [ ] **Test**: Write test for invalid combinations
- [ ] **Implement**: `isValidInput(weight, reps)` function
- [ ] **Refactor**: Combine weight and reps validation

#### 2.3.4 Sanitize Input
- [ ] **Test**: Write test for removing non-numeric characters
- [ ] **Test**: Write test for handling multiple decimal points
- [ ] **Test**: Write test for empty string
- [ ] **Implement**: `sanitizeNumericInput(input)` function

---

## Phase 3: UI Implementation

### 3.1 Styling Setup
**File**: `src/styles/main.css`

- [ ] Import Tailwind base, components, utilities
- [ ] Define custom CSS variables for colors
- [ ] Create animation keyframes (fadeIn)
- [ ] Add utility classes for scrollbar hiding
- [ ] Create focus styles for accessibility

### 3.2 Header Component
**File**: `index.html` (header section)

- [ ] Create sticky header with backdrop blur
- [ ] Add app title
- [ ] Add settings button (placeholder)
- [ ] Create unit toggle (Lbs/Kg) with radio buttons
- [ ] Style active state for unit toggle

### 3.3 Exercise Selector Component
**File**: `index.html` (exercise section)

- [ ] Create radio button group for exercises
- [ ] Style exercise pills (4 buttons)
- [ ] Add horizontal scroll container
- [ ] Implement active state styling (CSS)
- [ ] Add smooth scroll behavior

### 3.4 Exercise Card Component
**File**: `index.html` (exercise display)

- [ ] Create card container with image background
- [ ] Add gradient overlay
- [ ] Add exercise name and primary muscle labels
- [ ] Implement CSS-based card switching (radio:checked)
- [ ] Add hover scale animation
- [ ] Add fadeIn animation on card change

### 3.5 Input Card Component
**File**: `index.html` (input section)

- [ ] Create card container
- [ ] Add weight input field with label
- [ ] Add reps input field with label
- [ ] Add unit indicator to weight field
- [ ] Style input fields (dark mode)
- [ ] Add focus states

### 3.6 Result Display Component
**File**: `index.html` (result section)

- [ ] Create result card with gradient background
- [ ] Add 1RM display (large number)
- [ ] Add unit label
- [ ] Create 3-column grid for percentages
- [ ] Add dividers between percentage columns
- [ ] Style percentage labels and values

### 3.7 Calculate Button Component
**File**: `index.html` (footer section)

- [ ] Create fixed bottom container
- [ ] Add calculate button with icon
- [ ] Style button (primary color, shadow)
- [ ] Add hover and active states
- [ ] Add backdrop blur to footer

---

## Phase 4: JavaScript Implementation

### 4.1 Application State
**File**: `src/modules/state.js`

- [ ] Create `State` object literal
- [ ] Add `currentUnit` property with default value 'lbs'
- [ ] Add `currentExercise` property with default value 'squat'
- [ ] Add `lastCalculation` property with default value null
- [ ] Implement `getState()` method to return current state
- [ ] Implement `saveCalculation(calculation)` method to store last calculation
- [ ] Export State object

### 4.2 UI Module
**File**: `src/modules/ui.js`

- [ ] Add data attributes to HTML: `data-result="1rm"`, `data-result-unit`, `data-percentage="90/80/70"`
- [ ] Add data attributes to inputs: `data-input="weight"`, `data-input="reps"`
- [ ] Implement `updateResult(oneRM, unit)` function
  - [ ] Select result element using `querySelector('[data-result="1rm"]')`
  - [ ] Update textContent with formatted 1RM
  - [ ] Update unit label element
  - [ ] Call `animateResult()` for visual feedback
- [ ] Implement `updatePercentages(oneRM)` function
  - [ ] Calculate 90% value using Calculator.calculatePercentage
  - [ ] Update 90% display element
  - [ ] Calculate 80% value
  - [ ] Update 80% display element
  - [ ] Calculate 70% value
  - [ ] Update 70% display element
- [ ] Implement `showError(field, message)` function
  - [ ] Select input element by field name
  - [ ] Add 'border-red-500' class
  - [ ] Display error message (optional)
- [ ] Implement `clearErrors()` function
  - [ ] Select all input elements
  - [ ] Remove 'border-red-500' class from each
- [ ] Implement `animateResult(element)` function
  - [ ] Add 'animate-pulse' class
  - [ ] Set timeout to remove class after 300ms
- [ ] Implement `updateUnitDisplay(unit)` function
  - [ ] Update all unit labels throughout the UI
- [ ] Export UI object

### 4.3 Events Module
**File**: `src/modules/events.js`

- [ ] Import Calculator, UI, State modules
- [ ] Implement `init()` function
  - [ ] Call setupCalculateButton()
  - [ ] Call setupUnitToggle()
  - [ ] Call setupInputValidation()
  - [ ] Call setupExerciseSelection()
- [ ] Implement `setupCalculateButton()` function
  - [ ] Select button using `querySelector('[data-action="calculate"]')`
  - [ ] Add click event listener
  - [ ] Bind handleCalculate as callback
- [ ] Implement `handleCalculate()` function
  - [ ] Call UI.clearErrors()
  - [ ] Get weight value from input, parse as float
  - [ ] Get reps value from input, parse as int
  - [ ] Try-catch block for calculation
  - [ ] Call Calculator.calculate1RM(weight, reps)
  - [ ] Call UI.updateResult(oneRM, State.currentUnit)
  - [ ] Call UI.updatePercentages(oneRM)
  - [ ] Catch errors and call UI.showError()
- [ ] Implement `setupUnitToggle()` function
  - [ ] Select all radio buttons with name="unit"
  - [ ] Add change event listener to each
  - [ ] Bind handleUnitChange as callback
- [ ] Implement `handleUnitChange(event)` function
  - [ ] Get new unit from event.target.value
  - [ ] Get old unit from State.currentUnit
  - [ ] Select weight input element
  - [ ] If input has value, convert using Calculator.convertUnit
  - [ ] Update input value with converted result
  - [ ] Update State.currentUnit
  - [ ] Call UI.updateUnitDisplay(newUnit)
- [ ] Implement `setupInputValidation()` function
  - [ ] Select all input elements with data-input attribute
  - [ ] Add input event listener to each
  - [ ] Bind validateInput as callback
- [ ] Implement `validateInput(event)` function
  - [ ] Get input element and value from event
  - [ ] Parse value as number
  - [ ] Check if value is negative
  - [ ] Call UI.showError() if invalid, UI.clearErrors() if valid
- [ ] Implement `setupExerciseSelection()` function
  - [ ] Select all radio buttons with name="exercise"
  - [ ] Add change event listener to each
  - [ ] Bind handleExerciseChange as callback
- [ ] Implement `handleExerciseChange(event)` function
  - [ ] Get exercise ID from event.target.id
  - [ ] Remove 'ex-' prefix to get exercise name
  - [ ] Update State.currentExercise
- [ ] Export Events object

### 4.4 Main Entry Point
**File**: `src/main.js`

- [ ] Import Calculator from './modules/calculator.js'
- [ ] Import UI from './modules/ui.js'
- [ ] Import Events from './modules/events.js'
- [ ] Import State from './modules/state.js'
- [ ] Create `hasRequiredFeatures()` function
  - [ ] Check for querySelector support
  - [ ] Check for addEventListener support
  - [ ] Check for localStorage support
  - [ ] Return boolean result
- [ ] Add DOMContentLoaded event listener
  - [ ] Check hasRequiredFeatures(), alert if not supported
  - [ ] Call Events.init() to initialize app
- [ ] Add global error handler (window.onerror)
  - [ ] Log errors to console
  - [ ] Show user-friendly error message

---

## Phase 5: Testing & Quality Assurance

### 5.1 Automated Tests (Core Logic Only)
- [ ] Run all calculator tests (`npm test`)
- [ ] Run all validator tests
- [ ] Run all constants tests
- [ ] Verify 100% coverage for core modules (calculator, validators, constants)
- [ ] Fix any failing tests

**Note**: Only core logic is tested automatically. UI, events, and state are tested manually.

### 5.2 Manual Testing (UI & Integration)
- [ ] Test full calculation flow (input → calculate → result)
- [ ] Test unit conversion (Lbs ↔ Kg)
- [ ] Test exercise switching (all 4 exercises)
- [ ] Test error handling (empty inputs, invalid values)
- [ ] Test edge cases (0 weight, negative values, very large numbers)

### 5.3 Browser Compatibility Testing
- [ ] Test on Chrome (desktop)
- [ ] Test on Safari (desktop)
- [ ] Test on Firefox (desktop)
- [ ] Test on Chrome (mobile)
- [ ] Test on Safari (iOS)
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Test dark mode rendering

### 5.4 Performance Testing
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Check bundle size (target: < 100KB gzipped)
- [ ] Verify FCP < 1.5s
- [ ] Verify LCP < 2.5s
- [ ] Check animation performance (60fps)

### 5.5 Accessibility Testing
- [ ] Verify WCAG 2.1 Level AA compliance
- [ ] Check color contrast ratios
- [ ] Test keyboard-only navigation
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Verify ARIA labels and roles
- [ ] Check focus indicators

---

## Phase 6: Documentation & Deployment

### 6.1 Documentation
- [ ] Create `README.md` file
- [ ] Add project title and description to README
- [ ] Add live demo link placeholder to README
- [ ] Add features list to README
- [ ] Add installation instructions (clone, npm install)
- [ ] Add development commands (npm run dev, npm test)
- [ ] Add build commands (npm run build)
- [ ] Add deployment instructions
- [ ] Add technology stack section
- [ ] Add project structure overview
- [ ] Add contributing guidelines section
- [ ] Add license information
- [ ] Create `CHANGELOG.md` with v1.0.0 entry

### 6.2 Deployment Preparation
- [ ] Verify GitHub Actions workflow
- [ ] Test build process locally (`npm run build`)
- [ ] Verify dist output
- [ ] Check asset paths for GitHub Pages
- [ ] Configure GitHub Pages settings

### 6.3 Initial Deployment
- [ ] Commit all changes
- [ ] Push to main branch
- [ ] Verify GitHub Actions runs successfully
- [ ] Check deployed site on GitHub Pages
- [ ] Test all features on live site

### 6.4 Post-Deployment
- [ ] Add live demo link to README
- [ ] Create GitHub release (v1.0.0)
- [ ] Share project (optional)
- [ ] Monitor for issues

---

## Phase 7: Future Enhancements (Optional)

### 7.1 Additional Features
- [ ] Add calculation history (localStorage)
- [ ] Add progress tracking over time
- [ ] Add more exercises (Pull-up, Dip, Row)
- [ ] Add alternative formulas (Brzycki, Lombardi)
- [ ] Add export/import functionality

### 7.2 UI Improvements
- [ ] Add light mode theme
- [ ] Add language selection (Korean/English)
- [ ] Add onboarding tutorial
- [ ] Add keyboard shortcuts
- [ ] Add print stylesheet

### 7.3 Advanced Features
- [ ] Add user accounts (Firebase)
- [ ] Add cloud sync
- [ ] Add social sharing
- [ ] Add training program generator
- [ ] Add community features

---

## Task Tracking

### Legend
- `[ ]` Not started
- `[/]` In progress
- `[x]` Completed
- `[!]` Blocked/Issue

### Current Sprint Focus
**Sprint 1**: Project Setup & Infrastructure (Phase 1)
**Sprint 2**: Core Logic Implementation (Phase 2)
**Sprint 3**: UI Implementation (Phase 3-4)
**Sprint 4**: Testing & Deployment (Phase 5-6)

---

## Estimated Timeline

| Phase | Estimated Time | Priority |
|-------|---------------|----------|
| Phase 1: Setup | 2-3 hours | P0 |
| Phase 2: Core Logic | 4-6 hours | P0 |
| Phase 3: UI | 3-4 hours | P0 |
| Phase 4: JavaScript | 3-4 hours | P0 |
| Phase 5: Testing | 2-3 hours | P0 |
| Phase 6: Deployment | 1-2 hours | P0 |
| Phase 7: Enhancements | TBD | P2 |
| **Total** | **15-22 hours** | |

---

## Notes

- Follow TDD strictly for Phase 2 (Core Logic)
- Apply SOLID principles throughout
- Maintain 80%+ test coverage
- All tests must pass before deployment
- Review PRD and TechSpec before each phase
