# Contributing to Natural Events Tracker Pro

Thank you for your interest in contributing to Natural Events Tracker Pro! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Issues

1. Check if the issue already exists
2. Create a detailed bug report including:
   - Environment details (OS, Node/Python version)
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. Open a discussion issue first
2. Describe the feature and its benefits
3. Consider implementation approach
4. Wait for maintainer feedback before implementing

### Submitting Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our coding standards
4. Write/update tests as needed
5. Commit with clear messages: `git commit -m "feat: add new feature"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Development Setup

See README.md for detailed setup instructions.

## Coding Standards

### Python (Backend)

- Follow PEP 8 style guide
- Use type hints for all functions
- Write docstrings for all public functions
- Maximum line length: 120 characters
- Use Black for formatting: `black app/`
- Run Flake8 for linting: `flake8 app/`
- Run MyPy for type checking: `mypy app/`

### TypeScript/React (Frontend)

- Use functional components with hooks
- Follow ESLint rules
- Use TypeScript strict mode
- Write JSDoc comments for complex functions
- Use CSS Modules for styling
- Maintain consistent file structure

### Commit Messages

Follow conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code changes that neither fix bugs nor add features
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add event filtering by date range`

## Testing

### Backend Testing

```bash
cd backend
pytest tests/ -v
```

### Frontend Testing

```bash
cd frontend
npm test
```

### Writing Tests

- Write unit tests for all new functions
- Maintain test coverage above 80%
- Test edge cases and error conditions
- Use meaningful test descriptions

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add yourself to CONTRIBUTORS.md
4. Request review from maintainers
5. Address review feedback promptly
6. Squash commits before merging

## Project Structure

See PROJECT_STRUCTURE.md for detailed project organization.

## Questions?

Feel free to open an issue for any questions about contributing.