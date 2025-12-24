# SOLID Principles

## Overview
This project follows **SOLID principles** for all code implementation to ensure maintainability, scalability, and testability.

## The Five SOLID Principles

### 1. Single Responsibility Principle (SRP)
**Definition**: A class or module should have only one reason to change.

#### ✅ Good Example
```javascript
// calculator.js - Only handles calculations
export const Calculator = {
  calculate1RM(weight, reps) {
    return weight * (1 + reps / 30);
  },
  
  calculatePercentage(oneRM, percentage) {
    return (oneRM * percentage) / 100;
  }
};

// ui.js - Only handles UI updates
export const UI = {
  updateResult(value) {
    document.querySelector('[data-result]').textContent = value;
  }
};

// validators.js - Only handles validation
export const Validator = {
  isValidInput(weight, reps) {
    return weight > 0 && reps > 0 && reps <= 50;
  }
};
```

#### ❌ Bad Example
```javascript
// calculator.js - Doing too many things!
export const Calculator = {
  calculate1RM(weight, reps) {
    // Validation (should be separate)
    if (weight <= 0) throw new Error('Invalid weight');
    
    const result = weight * (1 + reps / 30);
    
    // UI update (should be separate)
    document.querySelector('[data-result]').textContent = result;
    
    // Logging (should be separate)
    console.log('Calculated 1RM:', result);
    
    return result;
  }
};
```

---

### 2. Open/Closed Principle (OCP)
**Definition**: Software entities should be open for extension but closed for modification.

#### ✅ Good Example
```javascript
// Base formula interface
class FormulaStrategy {
  calculate(weight, reps) {
    throw new Error('Must implement calculate method');
  }
}

// Epley formula (extension)
class EpleyFormula extends FormulaStrategy {
  calculate(weight, reps) {
    return weight * (1 + reps / 30);
  }
}

// Brzycki formula (extension)
class BrzyckiFormula extends FormulaStrategy {
  calculate(weight, reps) {
    return weight * (36 / (37 - reps));
  }
}

// Calculator uses strategy pattern
export class Calculator {
  constructor(formula = new EpleyFormula()) {
    this.formula = formula;
  }
  
  calculate1RM(weight, reps) {
    return this.formula.calculate(weight, reps);
  }
  
  // Can change formula without modifying Calculator
  setFormula(formula) {
    this.formula = formula;
  }
}
```

#### ❌ Bad Example
```javascript
// Must modify this class to add new formulas
export class Calculator {
  calculate1RM(weight, reps, formulaType = 'epley') {
    if (formulaType === 'epley') {
      return weight * (1 + reps / 30);
    } else if (formulaType === 'brzycki') {
      return weight * (36 / (37 - reps));
    }
    // Adding new formula requires modifying this method
  }
}
```

---

### 3. Liskov Substitution Principle (LSP)
**Definition**: Objects of a superclass should be replaceable with objects of a subclass without breaking the application.

#### ✅ Good Example
```javascript
// Base converter
class UnitConverter {
  convert(value, from, to) {
    throw new Error('Must implement convert method');
  }
}

// Weight converter
class WeightConverter extends UnitConverter {
  convert(value, from, to) {
    if (from === to) return value;
    if (from === 'lbs' && to === 'kg') return value * 0.453592;
    if (from === 'kg' && to === 'lbs') return value / 0.453592;
    throw new Error('Invalid conversion');
  }
}

// Can substitute any UnitConverter
function processConversion(converter, value, from, to) {
  return converter.convert(value, from, to);
}

const weightConverter = new WeightConverter();
processConversion(weightConverter, 100, 'lbs', 'kg'); // Works!
```

#### ❌ Bad Example
```javascript
class UnitConverter {
  convert(value, from, to) {
    return value; // Base implementation
  }
}

class WeightConverter extends UnitConverter {
  // Violates LSP: requires additional parameter
  convert(value, from, to, precision) {
    if (!precision) throw new Error('Precision required');
    // ...
  }
}
```

---

### 4. Interface Segregation Principle (ISP)
**Definition**: Clients should not be forced to depend on interfaces they don't use.

#### ✅ Good Example
```javascript
// Separate small interfaces
export const Calculable = {
  calculate1RM(weight, reps) { /* ... */ }
};

export const Formattable = {
  formatResult(value) { /* ... */ }
};

export const Convertible = {
  convertUnit(value, from, to) { /* ... */ }
};

// Use only what you need
class SimpleCalculator {
  constructor() {
    this.calculator = Calculable;
  }
  
  compute(weight, reps) {
    return this.calculator.calculate1RM(weight, reps);
  }
}

class AdvancedCalculator {
  constructor() {
    this.calculator = Calculable;
    this.formatter = Formattable;
    this.converter = Convertible;
  }
  
  computeAndFormat(weight, reps, unit) {
    const result = this.calculator.calculate1RM(weight, reps);
    const converted = this.converter.convertUnit(result, 'lbs', unit);
    return this.formatter.formatResult(converted);
  }
}
```

#### ❌ Bad Example
```javascript
// Fat interface - forces clients to implement everything
export const Calculator = {
  calculate1RM(weight, reps) { /* ... */ },
  formatResult(value) { /* ... */ },
  convertUnit(value, from, to) { /* ... */ },
  saveToDatabase(data) { /* ... */ },
  sendToAPI(data) { /* ... */ },
  generateReport(data) { /* ... */ }
};

// Simple calculator forced to implement unused methods
class SimpleCalculator {
  calculate1RM(weight, reps) { /* ... */ }
  formatResult(value) { throw new Error('Not implemented'); }
  convertUnit() { throw new Error('Not implemented'); }
  saveToDatabase() { throw new Error('Not implemented'); }
  // ... more unused methods
}
```

---

### 5. Dependency Inversion Principle (DIP)
**Definition**: High-level modules should not depend on low-level modules. Both should depend on abstractions.

#### ✅ Good Example
```javascript
// Abstraction (interface)
class Storage {
  save(key, value) {
    throw new Error('Must implement save method');
  }
  
  load(key) {
    throw new Error('Must implement load method');
  }
}

// Low-level module
class LocalStorage extends Storage {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

// High-level module depends on abstraction
class CalculationHistory {
  constructor(storage) {
    this.storage = storage; // Depends on Storage abstraction
  }
  
  saveCalculation(calculation) {
    this.storage.save('lastCalculation', calculation);
  }
  
  loadLastCalculation() {
    return this.storage.load('lastCalculation');
  }
}

// Usage - can swap storage implementation
const history = new CalculationHistory(new LocalStorage());
```

#### ❌ Bad Example
```javascript
// High-level module directly depends on low-level module
class CalculationHistory {
  constructor() {
    // Tightly coupled to localStorage
  }
  
  saveCalculation(calculation) {
    localStorage.setItem('lastCalculation', JSON.stringify(calculation));
  }
  
  loadLastCalculation() {
    return JSON.parse(localStorage.getItem('lastCalculation'));
  }
}

// Cannot easily swap to different storage (e.g., IndexedDB, API)
```

---

## Application to 1RM Calculator

### Module Structure Following SOLID

```
src/
├── modules/
│   ├── calculator.js       # SRP: Only calculations
│   ├── ui.js              # SRP: Only UI updates
│   └── events.js          # SRP: Only event handling
├── utils/
│   ├── validators.js      # SRP: Only validation
│   ├── formatters.js      # SRP: Only formatting
│   └── converters.js      # SRP: Only conversions
└── strategies/
    ├── FormulaStrategy.js # OCP: Base for formulas
    ├── EpleyFormula.js    # OCP: Specific implementation
    └── BrzyckiFormula.js  # OCP: Another implementation
```

### Example: Calculator Module

```javascript
// src/modules/calculator.js
import { EpleyFormula } from '../strategies/EpleyFormula.js';
import { Validator } from '../utils/validators.js';

export class Calculator {
  constructor(formula = new EpleyFormula(), validator = Validator) {
    this.formula = formula;        // DIP: Depend on abstraction
    this.validator = validator;    // DIP: Depend on abstraction
  }
  
  // SRP: Only responsible for orchestrating calculation
  calculate1RM(weight, reps) {
    if (!this.validator.isValidInput(weight, reps)) {
      throw new Error('Invalid input');
    }
    
    return this.formula.calculate(weight, reps);
  }
  
  // OCP: Can change formula without modifying this class
  setFormula(formula) {
    this.formula = formula;
  }
}
```

---

## Code Review Checklist

When reviewing code, check for SOLID violations:

- [ ] **SRP**: Does each module/class have only one responsibility?
- [ ] **OCP**: Can we add new features without modifying existing code?
- [ ] **LSP**: Can we substitute derived classes without breaking functionality?
- [ ] **ISP**: Are interfaces small and focused?
- [ ] **DIP**: Do high-level modules depend on abstractions, not concrete implementations?

---

## Benefits of SOLID

1. **Maintainability**: Easier to understand and modify code
2. **Testability**: Each module can be tested in isolation
3. **Flexibility**: Easy to add new features without breaking existing code
4. **Reusability**: Modules can be reused in different contexts
5. **Scalability**: Architecture supports growth

---

## Resources

- [SOLID Principles Explained](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID JavaScript](https://thefullstack.xyz/solid-javascript/)

---

**Remember**: SOLID principles are guidelines, not strict rules. Apply them pragmatically based on project needs!
