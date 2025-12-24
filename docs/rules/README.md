# Development Rules

This directory contains the core development principles and practices for the 1RM Calculator project.

## Rules

### [TDD (Test-Driven Development)](./TDD.md)
- **Scope**: All core logic (calculations, validators, utilities)
- **Workflow**: Red-Green-Refactor cycle
- **Coverage**: 80%+ overall, 100% for core modules
- **Enforcement**: CI/CD pipeline, code review

### [SOLID Principles](./SOLID.md)
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

## Quick Reference

### Before Writing Code
1. ✅ Write the test first (TDD)
2. ✅ Ensure single responsibility (SRP)
3. ✅ Design for extension, not modification (OCP)

### During Code Review
- [ ] Tests written before implementation?
- [ ] Test coverage meets requirements?
- [ ] Each module has single responsibility?
- [ ] Code follows SOLID principles?
- [ ] No tight coupling to concrete implementations?

### Before Committing
```bash
npm test              # All tests must pass
npm run test:coverage # Coverage must be 80%+
npm run lint          # No linting errors
```

---

**Remember**: These rules ensure code quality, maintainability, and testability. Follow them consistently!
