// Re-export types from the shared types module
// This allows us to maintain backward compatibility while centralizing our type definitions

import {
  type Episode,
  type BlogPost,
  type Comment,
  type Category,
  type SpotifyEpisode,
  type SpotifyEpisodesResponse,
  type EpisodesResult
} from '@shared/types';

export type {
  Episode,
  BlogPost,
  Comment,
  Category,
  SpotifyEpisode,
  SpotifyEpisodesResponse,
  EpisodesResult
};
