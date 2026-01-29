# Contributing to 20 Hard Challenge

Thank you for your interest in contributing to the 20 Hard Challenge app! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/20-hard-challenge.git
   cd 20-hard-challenge
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run tests to ensure everything works:
   ```bash
   npm test
   ```

## Development Workflow

1. **Create a branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards below

3. **Write or update tests** for your changes

4. **Run tests** to ensure everything passes:
   ```bash
   npm test
   ```

5. **Commit your changes** using conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** with a clear description of your changes

## Commit Message Guidelines

We follow the Conventional Commits specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add streak persistence to localStorage
fix: correct weight calculation formula
docs: update README with new API usage
```

## Coding Standards

- Write clear, self-documenting code
- Add comments for complex logic
- Follow existing code style and patterns
- Keep functions small and focused
- Use meaningful variable and function names

## Testing

- Write unit tests for new functionality
- Ensure all tests pass before submitting PR
- Aim for high test coverage
- Test edge cases and error conditions

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update CHANGELOG.md if applicable
4. Request review from maintainers
5. Address feedback promptly

## Questions?

Feel free to open an issue for discussion or questions about contributing.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
