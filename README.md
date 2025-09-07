# The Reverse Sweep Show - Cricket Podcast Website

A responsive modern website for The Reverse Sweep Show, a cricket podcast featuring episode listings and Spotify integration for episode streaming.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Components](#components)
- [API Endpoints](#api-endpoints)
- [Styling Guide](#styling-guide)
- [Maintenance and Updates](#maintenance-and-updates)

## Overview

The Reverse Sweep Show website is built as a modern, responsive platform to showcase podcast episodes exclusively for The Reverse Sweep Show podcast. The design follows a cricket-themed color palette with deep green, off-white, and gold accent colors.

## Features

- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Spotify Integration**: Direct Spotify API integration for fetching podcast episodes
- **Embedded Player**: Spotify player embedded for each episode with easy streaming
- **Latest Episodes**: Display of recent podcast episodes on homepage
- **Episode Details**: Dedicated page for each episode with description and player
- **AI Summaries**: OpenAI-powered summaries for episodes to provide quick overviews
- **Newsletter Signup**: User subscription for newsletter updates
- **About & Contact Pages**: Information about the show and contact form
- **Start Here Page**: Guide for new listeners

## Project Structure

```
project/
├── client/ - Frontend React application
│   ├── src/
│   │   ├── assets/ - Images and static files
│   │   ├── components/ - Reusable UI components
│   │   │   ├── episodes/ - Episode-related components
│   │   │   ├── home/ - Homepage section components
│   │   │   ├── layout/ - Header, Footer, etc.
│   │   │   └── ui/ - Shadcn UI components
│   │   ├── hooks/ - Custom React hooks
│   │   │   └── use-spotify-episodes.ts - Spotify API integration hook
│   │   ├── lib/ - Utility functions and types
│   │   ├── pages/ - Main page components
│   │   │   ├── Home.tsx - Homepage
│   │   │   ├── Episodes.tsx - Episode listing page
│   │   │   ├── EpisodeDetail.tsx - Individual episode page
│   │   │   ├── About.tsx - About the show page
│   │   │   ├── Contact.tsx - Contact form page
│   │   │   └── StartHere.tsx - Guide for new listeners
│   │   ├── App.tsx - Main application component with routing
│   │   └── main.tsx - Entry point
├── server/ - Backend Express application
│   ├── index.ts - Server entry point
│   ├── routes.ts - API route definitions
│   ├── spotifyService.ts - Spotify API service
│   ├── openaiService.ts - OpenAI API service for AI summaries
│   ├── storage.ts - Data storage implementation
│   └── vite.ts - Vite server setup
├── shared/ - Shared code between client and server
│   ├── schema.ts - Database schema and types
│   └── spotify-types.d.ts - Spotify API TypeScript definitions
└── README.md - This documentation
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express
- **Data Storage**: In-memory database (can be replaced with PostgreSQL)
- **UI Components**: Tailwind CSS, Shadcn UI
- **State Management**: React Query
- **Routing**: Wouter
- **External APIs**: Spotify API, OpenAI API
- **AI Integration**: OpenAI for episode summary generation

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. The application will be available at http://localhost:5000

## Components

### Layout Components

- **Header**: Navigation menu, logo and branding
- **Footer**: Site links, podcast platform links, copyright

### Home Page Components

- **HeroSection**: Main banner with call-to-action
- **LatestEpisodes**: Recent podcast episodes from Spotify API
- **FeatureSection**: Value proposition and benefits
- **NewsletterSignup**: Email subscription form

### Episode Components

- **EpisodeCard**: Card displaying episode information
- **SpotifyPlayer**: Embedded Spotify player for episodes

## API Endpoints

- `GET /api/spotify/show/:showId` - Get a specific podcast show information
- `GET /api/spotify/show/:showId/episodes` - Get episodes from a specific podcast
- `GET /api/spotify/episode/:episodeId` - Get details for a specific episode
- `POST /api/spotify/episodes/:spotifyId/generate-summary` - Generate an AI summary for a Spotify episode
- `POST /api/subscribers` - Subscribe to the newsletter
- `POST /api/contact` - Submit the contact form

## Styling Guide

### Colors

The website follows a cricket-themed color palette:

- **Primary Green**: #0A5F38 (--cricket-green)
- **Off-white**: #F8F8F2 (--cricket-offwhite)
- **Gold Accent**: #D4AF37 (--cricket-gold)
- **Light Gray**: #F0F0F0 (--cricket-gray)
- **Text Color**: #333333 (--cricket-text)

### Typography

- **Headings**: Montserrat (font-heading)
- **Body**: Roboto (font-body)

## Maintenance and Updates

### Episodes

New episodes are automatically fetched from the Spotify API when published to your podcast. 
The website always displays the most recent episodes from your Spotify podcast feed.

### API Integrations

#### Spotify API
The website uses the following environment variables for Spotify API access:
- `SPOTIFY_CLIENT_ID`: Your Spotify Developer account client ID
- `SPOTIFY_CLIENT_SECRET`: Your Spotify Developer account client secret

#### OpenAI Integration
For AI-powered episode summaries, you need to set up:
- `OPENAI_API_KEY`: Your OpenAI API key to enable the summary generation feature

These should be set up in your deployment environment.

### Updating UI Components

1. Locate the component in the `client/src/components` directory
2. Make modifications while maintaining the existing style pattern
3. Test on different screen sizes to ensure responsiveness

### Adding a New Page

1. Create a new page component in `client/src/pages`
2. Add the route in `client/src/App.tsx`
3. Add any necessary links in the Header/Footer navigation

### Modifying the Theme

1. Update color variables in `client/src/index.css`
2. Modify the theme configuration in `tailwind.config.ts` if needed

## Troubleshooting

### Common Issues

- **Spotify Player Not Loading**: Verify your Spotify credentials (CLIENT_ID and CLIENT_SECRET) are correctly set
- **Episodes Not Appearing**: Check that the PODCAST_SHOW_ID constant in use-spotify-episodes.ts matches your podcast ID
- **API Request Failing**: Verify the endpoint path and format in the React Query hook
- **Styling Issues**: Check for proper Tailwind class usage and the cricket-themed color variables

### Spotify API Issues

- **API Rate Limiting**: Spotify API has rate limits. Implement caching if you encounter rate limit errors
- **Token Expiration**: The application automatically refreshes access tokens, but verify the refresh logic if errors occur
- **Episode Detail Errors**: If episode details aren't loading, confirm the slugs are generated correctly in the formatSpotifyEpisode function

### AI Summary Issues

- **Summary Generation Failing**: Verify your OpenAI API key is correctly set in the environment variables
- **OpenAI API Rate Limits**: If you're generating many summaries, you might hit rate limits. Consider adding rate limiting or caching
- **Summary Quality Issues**: Adjust the prompt in the `generateEpisodeSummary` function in `server/openaiService.ts` to improve summary quality

---

Created for The Reverse Sweep Show by Suyash and Abhinav.