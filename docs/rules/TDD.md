# Test-Driven Development (TDD) Rule

## Overview
This project follows **Test-Driven Development (TDD)** for all core logic implementation. **UI components are excluded from automated testing** and will be tested manually.

## Scope
- ✅ **Apply TDD to**: Core business logic, calculations, utilities, data transformations
- ❌ **Exclude from TDD**: UI rendering, DOM manipulation, styling, event handlers
- 🧪 **Manual Testing Only**: All UI components and user interactions

## TDD Workflow

### Red-Green-Refactor Cycle
```
1. 🔴 RED: Write a failing test first
2. 🟢 GREEN: Write minimal code to make the test pass
3. 🔵 REFACTOR: Improve code while keeping tests green
```

### Implementation Process

#### Step 1: Write the Test First
```javascript
// ❌ WRONG: Writing implementation first
export function calculate1RM(weight, reps) {
  return weight * (1 + reps / 30);
}

// ✅ CORRECT: Write test first
// tests/calculator.test.js
import { describe, it, expect } from 'vitest';
import { calculate1RM } from '../src/modules/calculator';

describe('calculate1RM', () => {
  it('should calculate 1RM using Epley formula', () => {
    const result = calculate1RM(100, 5);
    expect(result).toBeCloseTo(116.67, 1);
  });
});
```

#### Step 2: Run the Test (Should Fail)
```bash
npm test
# Expected: Test fails because calculate1RM doesn't exist yet
```

#### Step 3: Write Minimal Implementation
```javascript
// src/modules/calculator.js
export function calculate1RM(weight, reps) {
  return weight * (1 + reps / 30);
}
```

#### Step 4: Run the Test (Should Pass)
```bash
npm test
# Expected: Test passes ✅
```

#### Step 5: Refactor (If Needed)
```javascript
// Improve code quality while keeping tests green
export function calculate1RM(weight, reps) {
  const EPLEY_CONSTANT = 30;
  return weight * (1 + reps / EPLEY_CONSTANT);
}
```

## Core Logic Modules Requiring TDD

### 1. Calculator Module (`src/modules/calculator.js`)
**Functions to test:**
- `calculate1RM(weight, reps)` - Epley formula
- `calculatePercentage(oneRM, percentage)` - Percentage calculations
- `convertUnit(value, from, to)` - Unit conversions
- `isValidInput(weight, reps)` - Input validation
- `formatResult(value)` - Number formatting

**Test coverage requirement:** 100%

### 2. Validators Module (`src/utils/validators.js`)
**Functions to test:**
- `validateWeight(weight)` - Weight validation
- `validateReps(reps)` - Reps validation
- `validateUnit(unit)` - Unit validation
- `sanitizeNumericInput(input)` - Input sanitization

**Test coverage requirement:** 100%

## Test Coverage Requirements

| Module Type | Minimum Coverage | Target Coverage | Testing Method |
|-------------|-----------------|-----------------|----------------|
| Core Logic | 90% | 100% | Automated (TDD) |
| Utilities | 90% | 100% | Automated (TDD) |
| UI Components | N/A | N/A | Manual Only |
| Event Handlers | N/A | N/A | Manual Only |
| **Overall** | **80%** | **90%+** | Mixed |

**Note**: Coverage percentages apply only to core logic and utilities. UI and event handlers are tested manually through browser testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## TDD Best Practices

### ✅ DO
- Write the test before the implementation
- Test one thing at a time
- Use descriptive test names
- Test edge cases and error conditions
- Keep tests simple and readable
- Use AAA pattern (Arrange, Act, Assert)

### ❌ DON'T
- Write implementation before tests
- Test multiple things in one test
- Write tests that depend on other tests
- Skip edge cases
- Write flaky tests

## Enforcement

- **CI/CD Pipeline**: Tests must pass in GitHub Actions before merge
- **Code Review**: Reviewers must verify tests were written first
- **Coverage Gates**: PRs that decrease coverage below 80% will be rejected

---

**Remember**: In TDD, the test is the specification. Write the test first to clarify what you're building!
