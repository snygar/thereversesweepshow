# The Reverse Sweep Show - Developer Guide

This guide provides technical information for developers working on The Reverse Sweep Show website. It covers setup, architecture, testing, and deployment.

## Development Environment

### Requirements

- Node.js v14+ (v16+ recommended)
- npm or yarn
- Code editor (VS Code recommended with ESLint and Tailwind CSS extensions)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5000`

## Architecture Overview

The project follows a modern full-stack JavaScript architecture:

### Frontend

- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library using Radix UI and Tailwind
- **Wouter**: Lightweight routing
- **React Query**: Data fetching and state management

### Backend

- **Node.js**: Runtime
- **Express**: Web server
- **TypeScript**: Type safety
- **In-memory database**: For storing application data (can be replaced with PostgreSQL)

### File Structure

```
project/
├── client/              # Frontend code
│   ├── src/
│   │   ├── assets/      # Static assets
│   │   ├── components/  # Reusable components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and helpers
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Root component
│   │   └── main.tsx     # Entry point
├── server/              # Backend code
│   ├── index.ts         # Entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Database interface
│   └── vite.ts          # Vite server setup
├── shared/              # Shared code
│   └── schema.ts        # Database schema and types
└── ... config files
```

## Key Libraries and Tools

### Frontend

- **React Query**: Used for all API requests and server state management
  - Query keys format: `['/api/endpoint', param1, param2]`
  - Cache invalidation commonly needed after mutations

- **Wouter**: Used for client-side routing
  - Route definition in `App.tsx`
  - `<Link>` component for navigation
  - `useParams` hook for route parameters

- **Tailwind CSS**: Used for styling
  - Custom theme defined in `tailwind.config.ts`
  - Cricket-themed colors in `index.css`

- **Shadcn UI**: Used for UI components
  - Components in `components/ui`
  - Based on Radix UI primitives and styled with Tailwind

### Backend

- **Express**: Used for the REST API
  - Routes defined in `server/routes.ts`
  - Error handling middleware in `server/index.ts`

- **In-memory Storage**: Used as the database
  - Implementation in `server/storage.ts`
  - Interface definition in the same file

## Data Model

The data model is defined in `shared/schema.ts` using Drizzle and Zod:

### Main Models

- **Episodes**: Podcast episodes data
  - ID, title, description, date, duration, Spotify info, slug

- **Blog Posts**: Blog content
  - ID, title, content, excerpt, date, author, category, slug

- **Subscribers**: Newsletter subscribers
  - ID, email, name, subscribed_at

## API Endpoints

### Episodes

- `GET /api/episodes?page=1&limit=10`: Get paginated episodes
- `GET /api/episodes/:id`: Get episode by ID
- `GET /api/episodes/slug/:slug`: Get episode by slug
- `GET /api/episodes/featured`: Get featured episodes

### Blog

- `GET /api/blog/posts?page=1&limit=10&category=ANALYSIS`: Get paginated blog posts
- `GET /api/blog/posts/:id`: Get blog post by ID
- `GET /api/blog/posts/slug/:slug`: Get blog post by slug
- `GET /api/blog/featured`: Get featured blog posts
- `GET /api/blog/recent`: Get recent blog posts
- `GET /api/blog/categories`: Get all blog categories

### Users

- `POST /api/subscribers`: Add a new newsletter subscriber
- `POST /api/contact`: Submit a contact form message

## Frontend Architecture

### State Management

- **Server State**: Managed with React Query
  - API requests, caching, and revalidation
  - Optimistic updates for mutations

- **UI State**: Managed with React's useState and useReducer
  - Form state with react-hook-form
  - Component-local state with useState

### Component Structure

- **Pages**: Container components that fetch data and compose other components
- **Layout**: Components for page structure (Header, Footer)
- **Feature Components**: Domain-specific components (EpisodeCard, ArticleCard)
- **UI Components**: Reusable UI primitives (Button, Card, Dialog)

### Styling

- **Global Styles**: In `index.css`
- **Component Styles**: Using Tailwind classes directly in components
- **Theme Customization**: In `tailwind.config.ts` and `theme.json`

## Common Development Tasks

### Adding a New Page

1. Create a new component in `client/src/pages/`
2. Add the route in `App.tsx`:
   ```tsx
   <Route path="/new-page" component={NewPage} />
   ```
3. Add navigation links in Header/Footer

### Adding a New API Endpoint

1. Define the route in `server/routes.ts`
2. Implement the storage method in `server/storage.ts` if needed
3. Create a React Query hook in the relevant component

### Adding a New Component

1. Create the component in the appropriate directory
2. Use TypeScript interfaces for props
3. Implement responsive design with Tailwind's responsive modifiers
4. Add Storybook story if using Storybook

## Database Migration

If migrating from in-memory to PostgreSQL:

1. Set up PostgreSQL database
2. Create tables using Drizzle migrations
3. Update the storage implementation to use PostgreSQL
4. Test all API endpoints for compatibility

## Deployment

### Production Build

1. Create a production build:
   ```bash
   npm run build
   ```
2. The build output will be in `dist/`

### Deployment Options

- **Replit**: Deploy directly from the Replit interface
- **Vercel**: Connect repository and deploy
- **Netlify**: Connect repository and deploy
- **Self-hosted**: Deploy the Node.js application on your server

## Performance Optimization

- Use code splitting for larger components
- Optimize images in `assets/`
- Enable React Query caching strategies
- Use React.memo for expensive components

## Troubleshooting

### Common Issues

- **API errors**: Check server logs and endpoint implementation
- **Component rendering issues**: Verify data structure and component props
- **Styling inconsistencies**: Check Tailwind class order and specificity

### Debugging Tools

- React DevTools for component inspection
- Network tab in browser DevTools for API requests
- Console logs for runtime issues

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Wouter Documentation](https://github.com/molefrog/wouter)
- [Shadcn UI Documentation](https://ui.shadcn.com)

---

This guide is maintained by the development team of The Reverse Sweep Show website. Last updated April 2025.