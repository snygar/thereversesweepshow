declare module 'spotify-web-api-node' {
  export default class SpotifyWebApi {
    constructor(options?: {
      clientId?: string;
      clientSecret?: string;
      redirectUri?: string;
      accessToken?: string;
      refreshToken?: string;
    });

    setAccessToken(accessToken: string): void;
    setRefreshToken(refreshToken: string): void;
    setClientId(clientId: string): void;
    setClientSecret(clientSecret: string): void;
    setRedirectURI(redirectUri: string): void;

    clientCredentialsGrant(): Promise<{
      body: {
        access_token: string;
        token_type: string;
        expires_in: number;
      };
    }>;

    getShowEpisodes(showId: string, options?: { limit?: number; offset?: number; market?: string }): Promise<{
      body: {
        href: string;
        items: SpotifyApi.EpisodeObject[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
      };
    }>;

    getEpisode(id: string, options?: { market?: string }): Promise<{
      body: SpotifyApi.EpisodeObject;
    }>;

    getShow(id: string, options?: { market?: string }): Promise<{
      body: SpotifyApi.ShowObject;
    }>;

    searchShows(query: string, options?: { limit?: number; offset?: number; market?: string }): Promise<{
      body: {
        shows: {
          href: string;
          items: SpotifyApi.ShowObject[];
          limit: number;
          next: string | null;
          offset: number;
          previous: string | null;
          total: number;
        };
      };
    }>;
  }
}

declare namespace SpotifyApi {
  interface EpisodeObject {
    audio_preview_url: string | null;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageObject[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language?: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point?: {
      fully_played: boolean;
      resume_position_ms: number;
    };
    show: ShowObject;
    type: 'episode';
    uri: string;
  }

  interface ShowObject {
    available_markets: string[];
    copyrights: CopyrightObject[];
    description: string;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageObject[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: 'show';
    uri: string;
    total_episodes?: number;
  }

  interface ImageObject {
    url: string;
    height: number | null;
    width: number | null;
  }

  interface CopyrightObject {
    text: string;
    type: 'C' | 'P';
  }
}