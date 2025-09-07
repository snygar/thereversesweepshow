import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { 
  type SpotifyEpisode, 
  type SpotifyEpisodesResponse, 
  type EpisodesResult,
  type Episode
} from '@/lib/types';
import { formatEpisodeDescription, createExcerpt } from '@/lib/textUtils';

// The Reverse Sweep Show Spotify ID 
export const PODCAST_SHOW_ID = '1Rh9PS3KPWtdqrSRQ3Kymi'; // Your actual podcast ID

// Information about The Reverse Sweep Show
export const PODCAST_INFO = { 
  id: PODCAST_SHOW_ID, 
  name: 'The Reverse Sweep Show',
  description: 'A podcast for cricket lovers across the world, hosted by two self-proclaimed delusional cricket fans, Suyash and Abhinav. Each episode, we dive into alternate cricketing realities, reimagining the sport\'s most game-changing moments.'
};

export function useSpotifyShow(showId = PODCAST_SHOW_ID) {
  return useQuery({
    queryKey: ['/api/spotify/show', showId],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
  });
}

export function useSpotifyShowEpisodes(showId = PODCAST_SHOW_ID, limit = 10, offset = 0) {
  return useQuery<SpotifyEpisodesResponse, Error, EpisodesResult>({
    queryKey: ['/api/spotify/show', showId, 'episodes', limit, offset],
    queryFn: async ({ queryKey }) => {
      const [_, showId, __, limit, offset] = queryKey as [string, string, string, number, number];
      const response = await fetch(`/api/spotify/show/${showId}/episodes?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error fetching podcast episodes');
      }
      return response.json();
    },
    select: (data: any) => {
      // Handle different response formats that could come from Spotify API
      const items = data?.items || // Standard format
                 data?.episodes?.items || // Nested format
                 [];
      const total = data?.total || 
                 data?.episodes?.total || 
                 items.length || 
                 0;
      
      // Get show image URL for fallback
      const showImageUrl = data?.show_image_url;
      
      console.log('Processing episodes:', items.length, 'show image:', showImageUrl);
      
      const formattedEpisodes = items.map((episode: SpotifyEpisode) => {
        const formatted = formatSpotifyEpisode(episode, showImageUrl);
        console.log('Formatted episode:', formatted.title, 'imageUrl:', formatted.imageUrl);
        return formatted;
      });
                 
      return {
        episodes: formattedEpisodes,
        totalCount: total,
      };
    },
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
    retry: 1, // Only retry once to avoid hammering the API
    enabled: !!showId, // Only run the query if we have a show ID
  });
}

export function useSpotifyEpisode(episodeId: string) {
  return useQuery<SpotifyEpisode, Error>({
    queryKey: ['/api/spotify/episode', episodeId],
    queryFn: async ({ queryKey }) => {
      const [_, episodeId] = queryKey as [string, string];
      try {
        const response = await fetch(`/api/spotify/episode/${episodeId}`);
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error fetching episode');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching podcast episode:', error);
        throw error;
      }
    },
    retry: 1,
    enabled: !!episodeId,
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
  });
}

// Episode import is now at the top with other imports

// Utility function to format Spotify episode to match our Episode type
export function formatSpotifyEpisode(spotifyEpisode: SpotifyEpisode, showImageUrl?: string): Episode {
  // Check if spotifyEpisode is valid before trying to access properties
  if (!spotifyEpisode || !spotifyEpisode.id) {
    // Return a fallback episode object with safe values
    return {
      id: Math.floor(Math.random() * 100000), // Generate a random ID
      title: 'Episode Not Available',
      description: 'This episode information could not be loaded.',
      date: new Date().toISOString().split('T')[0],
      duration: '0:00',
      spotifyUrl: '',
      spotifyId: '',
      imageUrl: undefined,
      slug: 'episode-not-available',
      isNew: 0,
      transcript: undefined,
      aiSummary: undefined,
    };
  }
  
  try {
    return {
      id: parseInt(spotifyEpisode.id.substring(0, 6), 36) % 100000, // Generate a numeric ID from Spotify ID
      title: spotifyEpisode.name || 'Untitled Episode',
      description: formatEpisodeDescription(spotifyEpisode.description || 'No description available'),
      date: spotifyEpisode.release_date || new Date().toISOString().split('T')[0],
      duration: formatDuration(spotifyEpisode.duration_ms || 0),
      spotifyUrl: spotifyEpisode.external_urls?.spotify || '',
      spotifyId: spotifyEpisode.id,
      imageUrl: spotifyEpisode.images?.[0]?.url || showImageUrl || undefined,
      slug: createSlug(spotifyEpisode.name || 'untitled-episode'),
      isNew: spotifyEpisode.release_date ? isNewEpisode(spotifyEpisode.release_date) ? 1 : 0 : 0,
      // Setting these as undefined instead of null to match the Episode type
      transcript: undefined,
      aiSummary: undefined,
    };
  } catch (error) {
    console.error('Error formatting Spotify episode:', error);
    // Return a fallback episode object with safe values
    return {
      id: Math.floor(Math.random() * 100000), // Generate a random ID
      title: 'Episode Error',
      description: 'There was an error loading this episode.',
      date: new Date().toISOString().split('T')[0],
      duration: '0:00',
      spotifyUrl: '',
      spotifyId: '',
      imageUrl: undefined,
      slug: 'episode-error',
      isNew: 0,
      transcript: undefined,
      aiSummary: undefined,
    };
  }
}

// Helper function to format duration from milliseconds to "MM:SS" format
function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Helper function to create a slug from a title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to check if an episode is new (released within the last 14 days)
function isNewEpisode(releaseDate: string): boolean {
  const releaseTime = new Date(releaseDate).getTime();
  const currentTime = new Date().getTime();
  const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;
  
  return currentTime - releaseTime <= fourteenDaysInMs;
}