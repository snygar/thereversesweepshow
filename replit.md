# The Reverse Sweep Show - Cricket Podcast Website

## Overview

The Reverse Sweep Show is a modern, responsive website for a cricket podcast featuring episode listings, Spotify integration, and blog functionality. The platform showcases podcast episodes exclusively for The Reverse Sweep Show podcast with direct Spotify API integration for fetching and streaming episodes.

## System Architecture

This is a full-stack TypeScript application built with a modern React frontend and Express.js backend, designed for deployment on Replit with autoscaling capabilities.

### Frontend Architecture
- **React 18** with TypeScript for UI components
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **TanStack Query** for data fetching and state management
- **Tailwind CSS** with Shadcn/ui component library for styling
- **React Hook Form** with Zod validation for form handling

### Backend Architecture
- **Express.js** server with TypeScript
- **Drizzle ORM** configured for PostgreSQL database operations
- **Neon Database** as the PostgreSQL provider
- **In-memory storage** fallback for development

## Key Components

### Database Schema
The application uses Drizzle ORM with the following main entities:
- **Users**: Authentication and user management
- **Episodes**: Podcast episode metadata with Spotify integration
- **Blog Posts**: Content management with categories and slugs
- **Subscribers**: Newsletter subscription management
- **Comments**: Episode discussion functionality

### API Integration
- **Spotify Web API**: Direct integration for fetching podcast episodes and metadata
- **OpenAI API**: AI-powered episode summary generation
- **Google Analytics**: User tracking and analytics

### UI Components
- **Shadcn/ui**: Complete component library built on Radix UI primitives
- **Custom Cricket Theme**: Professional green color scheme with cricket-themed styling
- **Responsive Design**: Mobile-first approach with optimized layouts

## Data Flow

1. **Episode Management**: Episodes are fetched from Spotify API and can be enhanced with AI-generated summaries
2. **Content Display**: Homepage displays latest episodes with embedded Spotify players
3. **Blog System**: Full blog functionality with categories, admin interface, and content management
4. **User Interaction**: Newsletter signup, contact forms, and episode comments
5. **Analytics**: Google Analytics integration for tracking user behavior

## External Dependencies

### Required Environment Variables
- `DATABASE_URL`: PostgreSQL connection string for Neon Database
- `SPOTIFY_CLIENT_ID`: Spotify Web API client ID
- `SPOTIFY_CLIENT_SECRET`: Spotify Web API client secret
- `OPENAI_API_KEY`: OpenAI API key for AI summary generation

### Third-Party Services
- **Spotify**: Podcast episode streaming and metadata
- **Neon Database**: PostgreSQL hosting
- **OpenAI**: AI content generation
- **Google Analytics**: User tracking (Measurement ID: G-V2DDDGR49G)

## Deployment Strategy

The application is configured for Replit deployment with:
- **Autoscale deployment target** for production scaling
- **PostgreSQL 16 module** for database support
- **Node.js 20** runtime environment
- **Port 5000** for local development, port 80 for external access
- **Build process**: `npm run build` compiles both frontend and backend
- **Production start**: `npm run start` runs the compiled application

### Development Workflow
- **Development server**: `npm run dev` starts both frontend and backend
- **Database management**: `npm run db:push` syncs database schema
- **Type checking**: `npm run check` validates TypeScript

## Changelog

- January 28, 2025. SEO optimization implementation
  - Added crawler-friendly headers (X-Robots-Tag, Cache-Control)
  - Created sitemap.xml for better page discovery
  - Added robots.txt for search engine guidance
  - Implemented security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)

- June 16, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.