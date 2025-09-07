import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ChevronLeft, Calendar, Clock, Share2, Sparkles } from "lucide-react";
import { type Episode } from "@/lib/types";
import SpotifyPlayer from "@/components/episodes/SpotifyPlayer";
import CommentForm from "@/components/episodes/CommentFormSimple";
import CommentList from "@/components/episodes/CommentListNew";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { 
  useSpotifyShowEpisodes, 
  formatSpotifyEpisode, 
  type SpotifyEpisode,
  PODCAST_SHOW_ID
} from "@/hooks/use-spotify-episodes";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

const EpisodeDetail = () => {
  const [, params] = useRoute("/episodes/:slug");
  const slug = params?.slug;
  const { toast } = useToast();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingAiSummary, setIsGeneratingAiSummary] = useState(false);
  
  // Fetch all episodes and find the one matching the slug
  const episodesQuery = useSpotifyShowEpisodes(PODCAST_SHOW_ID, 50, 0);
  
  // Create mutation for generating AI summary
  const aiSummaryMutation = useMutation({
    mutationFn: async (spotifyId: string) => {
      return apiRequest<{success: boolean, summary: string}>(
        `/api/spotify/episodes/${spotifyId}/generate-summary`, 
        { method: 'POST' }
      );
    },
    onSuccess: (data) => {
      if (data && data.summary) {
        setEpisode(prev => prev ? { ...prev, aiSummary: data.summary } : null);
        toast({
          title: "AI Summary Generated",
          description: "Episode summary has been created successfully!",
        });
      }
      setIsGeneratingAiSummary(false);
    },
    onError: (error) => {
      console.error('Error generating AI summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI summary. Please try again.",
        variant: "destructive"
      });
      setIsGeneratingAiSummary(false);
    }
  });
  
  useEffect(() => {
    if (episodesQuery.data?.episodes && slug) {
      setIsLoading(false);
      
      // Find the episode with the matching slug
      const spotifyEpisodes = episodesQuery.data.episodes
        .filter((episode: SpotifyEpisode | null | undefined) => 
          episode && typeof episode === 'object' && 'id' in episode && episode.id);
      
      const formattedEpisodes = spotifyEpisodes
        .map((episode: SpotifyEpisode) => formatSpotifyEpisode(episode));
      
      const foundEpisode = formattedEpisodes.find(ep => ep.slug === slug);
      
      if (foundEpisode) {
        setEpisode(foundEpisode);
      }
    }
  }, [episodesQuery.data, slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode?.title,
        text: episode?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Episode link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex space-x-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <Skeleton className="h-[232px] w-full mb-8" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-4/5 mb-3" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-full mb-3" />
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Episode Not Found</h1>
          <p className="text-gray-600 mb-6">The episode you're looking for doesn't exist or has been removed.</p>
          <Link href="/episodes">
            <Button className="cursor-pointer">View All Episodes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{episode.title} - The Reverse Sweep Show</title>
        <meta name="description" content={episode.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/episodes" className="inline-flex items-center text-cricket-green hover:text-cricket-gold mb-6">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Episodes
            </Link>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{episode.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {new Date(episode.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{episode.duration}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleShare} className="ml-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <SpotifyPlayer spotifyId={episode.spotifyId} height={232} />
          
          <div className="mt-8">
            <h2 className="text-2xl font-heading font-bold mb-4">Episode Description</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">{episode.description}</p>

            {episode.transcript && (
              <>
                <Separator className="my-8" />
                <h2 className="text-2xl font-heading font-bold mb-4">Episode Transcript</h2>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{episode.transcript}</p>
                </div>
              </>
            )}

            {episode.aiSummary ? (
              <>
                <Separator className="my-8" />
                <h2 className="text-2xl font-heading font-bold mb-4">AI Summary</h2>
                <div className="bg-cricket-gray p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">Key Takeaways</h3>
                  <p className="whitespace-pre-line">{episode.aiSummary}</p>
                </div>
              </>
            ) : (
              <>
                <Separator className="my-8" />
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-heading font-bold">AI Summary</h2>
                  <Button 
                    onClick={() => {
                      if (episode && episode.spotifyId) {
                        setIsGeneratingAiSummary(true);
                        aiSummaryMutation.mutate(episode.spotifyId);
                      }
                    }}
                    variant="default"
                    disabled={isGeneratingAiSummary || aiSummaryMutation.isPending}
                    className="bg-cricket-green hover:bg-cricket-gold text-white"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGeneratingAiSummary || aiSummaryMutation.isPending ? 'Generating...' : 'Generate AI Summary'}
                  </Button>
                </div>
                <div className="bg-cricket-gray p-6 rounded-lg">
                  <p className="text-center text-gray-600">
                    {isGeneratingAiSummary || aiSummaryMutation.isPending ? (
                      "Creating an AI-powered summary for this episode. This may take a few moments..."
                    ) : (
                      "No AI summary available for this episode yet. Click the button above to generate one."
                    )}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-heading font-bold mb-4">Listen on</h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href={episode.spotifyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-cricket-green/10 hover:bg-cricket-green/20 text-cricket-green px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </a>
              <a 
                href="#" 
                className="bg-cricket-green/10 hover:bg-cricket-green/20 text-cricket-green px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85-.2.3-.5.35-.85.2zm1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1-.15.35-.65.5-1.05.25zm.1-2.8c-3.3-1.95-8.65-2.1-11.8-1.15-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25z"/>
                </svg>
                Apple Podcasts
              </a>
              <a 
                href="#" 
                className="bg-cricket-green/10 hover:bg-cricket-green/20 text-cricket-green px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Google Podcasts
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Separator className="mb-8" />
            <CommentForm episodeId={episode.spotifyId} />
            <CommentList episodeId={episode.spotifyId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeDetail;
