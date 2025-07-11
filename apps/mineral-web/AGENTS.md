# AGENTS.md - Development Guidelines

## Build/Test Commands
- `npm run dev` - Start development server on port 3007 with turbopack
- `npm run build` - Build for production
- `npm run lint` - Run TypeScript check and ESLint with auto-fix
- `npm run prettify` - Format code with Prettier
- `npm run test` - Run Jest unit tests
- `npm run e2e` - Run Playwright e2e tests
- Single test: `npm run test -- --testNamePattern="test name"`

## Code Style
- **Imports**: Use `@/` for local imports, group React imports first
- **Formatting**: Single quotes, Prettier with Tailwind plugin
- **Types**: Use TypeScript interfaces for props, import types with `type` keyword
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Components**: Use React.forwardRef for ref forwarding, functional components preferred
- **State**: Zustand stores with Immer for immutable updates
- **Styling**: Tailwind CSS classes, use `clsx` for conditional classes
- **Files**: `.tsx` for components, `.ts` for utilities, kebab-case filenames

## Error Handling
- Use try/catch for async operations
- Graceful fallbacks for UI components
- Console logging via `utils/log.ts`