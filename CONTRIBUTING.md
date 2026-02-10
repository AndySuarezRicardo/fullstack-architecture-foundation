# Contributing Guide

Thank you for considering contributing to this project! 

## Development Setup

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/fullstack-architecture-foundation.git
   cd fullstack-architecture-foundation
   ```

3. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your configuration

   # Frontend
   cd ../frontend
   cp .env.example .env
   ```

5. **Start development servers:**
   ```bash
   # Option 1: Use the development script
   chmod +x scripts/dev.sh
   ./scripts/dev.sh

   # Option 2: Manual startup
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

## Code Standards

### Linting
- Run `npm run lint` before committing
- Run `npm run lint:fix` to auto-fix issues
- Run `npm run format` to format code with Prettier

### Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add user authentication module
fix: resolve CORS issue in API endpoints
docs: update README with deployment instructions
```

## Pull Request Process

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request from your fork to the main repository

5. Ensure your PR:
   - Has a clear description of changes
   - Passes all CI checks
   - Follows code standards
   - Includes tests if applicable
   - Updates documentation if needed

## Adding New Modules

### Backend Module
```bash
backend/src/modules/your-module/
├── your-module.controller.js
├── your-module.service.js
├── your-module.validator.js
└── index.js
```

### Frontend Feature
```bash
frontend/src/features/your-feature/
├── YourFeature.jsx
├── YourFeature.css
├── components/
└── hooks/
```

## Testing

### Backend
```bash
cd backend
npm test
npm run test:watch  # Watch mode
```

### Frontend
```bash
cd frontend
npm test
```

## Questions?

- Open an issue for bug reports
- Start a discussion for feature requests
- Check existing issues before creating new ones

Thank you for contributing! 🎉
