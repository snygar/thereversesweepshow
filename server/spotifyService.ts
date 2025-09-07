import SpotifyWebApi from 'spotify-web-api-node';
import { log } from './vite';

// Initialize the Spotify Web API with credentials
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

let tokenExpirationTime = 0;

// Function to check if token is expired and refresh if needed
async function ensureValidToken() {
  const now = Date.now();
  
  // If token is expired or about to expire (within 60 seconds)
  if (now >= tokenExpirationTime - 60000) {
    try {
      log('Refreshing Spotify access token', 'spotify');
      const data = await spotifyApi.clientCredentialsGrant();
      
      // Save the access token and expiration time
      spotifyApi.setAccessToken(data.body['access_token']);
      
      // Calculate expiration time (convert seconds to milliseconds)
      tokenExpirationTime = now + data.body['expires_in'] * 1000;
      
      log('Spotify access token refreshed', 'spotify');
    } catch (error) {
      log(`Error refreshing Spotify token: ${error}`, 'spotify');
      throw error;
    }
  }
}

// Get show episodes by show ID
export async function getShowEpisodes(showId: string, limit = 10, offset = 0) {
  try {
    await ensureValidToken();
    
    const response = await spotifyApi.getShowEpisodes(showId, { limit, offset });
    return response.body;
  } catch (error) {
    log(`Error fetching show episodes: ${error}`, 'spotify');
    throw error;
  }
}

// Get a specific episode by ID
export async function getEpisode(episodeId: string) {
  try {
    await ensureValidToken();
    
    const response = await spotifyApi.getEpisode(episodeId);
    return response.body;
  } catch (error) {
    log(`Error fetching episode: ${error}`, 'spotify');
    throw error;
  }
}

// Get show details
export async function getShow(showId: string) {
  try {
    await ensureValidToken();
    
    const response = await spotifyApi.getShow(showId);
    return response.body;
  } catch (error) {
    log(`Error fetching show: ${error}`, 'spotify');
    throw error;
  }
}

// Search for podcasts
export async function searchShows(query: string, limit = 10, offset = 0) {
  try {
    await ensureValidToken();
    
    const response = await spotifyApi.searchShows(query, { limit, offset });
    return response.body;
  } catch (error) {
    log(`Error searching shows: ${error}`, 'spotify');
    throw error;
  }
}

// Initialize token on server startup
export async function initializeSpotifyClient() {
  try {
    await ensureValidToken();
    log('Spotify client initialized successfully', 'spotify');
    return true;
  } catch (error) {
    log(`Failed to initialize Spotify client: ${error}`, 'spotify');
    return false;
  }
}