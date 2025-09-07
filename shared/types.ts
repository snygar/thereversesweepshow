// shared/types.ts
// This file serves as the central type definition hub for the entire application

import { 
  type Episode as DbEpisode,
  type BlogPost as DbBlogPost,
  type Comment as DbComment,
  type Subscriber as DbSubscriber,
  type User as DbUser
} from './schema';

// Re-export the base types
export type { 
  DbEpisode,
  DbBlogPost, 
  DbComment, 
  DbSubscriber, 
  DbUser
};

// Frontend-specific episode type (with formatting)
export type Episode = {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: string;
  spotifyUrl: string;
  spotifyId: string;
  imageUrl?: string;
  isNew?: number;
  transcript?: string;
  aiSummary?: string;
  slug: string;
};

// Frontend-specific blog post type
export type BlogPost = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl?: string;
  slug: string;
};

// Frontend-specific comment type with proper typing
export type Comment = {
  id: number;
  episodeId: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
};

// Category type for blog posts
export type Category = 'ANALYSIS' | 'WHAT IF' | 'INTERVIEW' | 'TECHNIQUE' | 'HISTORY';

// Spotify related types
export interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  release_date: string;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}

export interface SpotifyEpisodesResponse {
  items: SpotifyEpisode[];
  total: number;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
}

export interface EpisodesResult {
  episodes: Episode[];
  totalCount: number;
}