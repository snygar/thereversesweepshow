import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { type Episode } from "@/lib/types";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import SpotifyPlayer from "@/components/episodes/SpotifyPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useSpotifyShowEpisodes, 
  PODCAST_SHOW_ID,
  PODCAST_INFO
} from "@/hooks/use-spotify-episodes";

const LatestEpisodes = () => {
  // Fetch episodes for The Reverse Sweep Show
  const { data, isLoading } = useSpotifyShowEpisodes(PODCAST_SHOW_ID, 6);
  
  // Episodes are already formatted from the hook
  const formattedEpisodes = data?.episodes || [];
    
  // Feature the first episode and show the next 3
  const featuredEpisode = formattedEpisodes.length > 0 ? formattedEpisodes[0] : null;
  const episodes = formattedEpisodes.slice(0, 4);

  return (
    <section id="latest-episodes" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-cricket-text">Latest Episodes</h2>
          <Link href="/episodes" className="text-cricket-green hover:text-cricket-gold font-medium flex items-center transition-colors duration-200">
            View All Episodes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="mb-6">
          <div className="bg-cricket-green/5 p-4 rounded-lg border border-cricket-green/20">
            <p className="font-bold text-lg">{PODCAST_INFO.name}</p>
            <p className="text-gray-600">{PODCAST_INFO.description}</p>
          </div>
        </div>
        
        <div className="spotify-player bg-cricket-gray p-5 rounded-lg mb-12">
          <h3 className="text-lg font-bold mb-3">Featured Episode</h3>
          {isLoading || !featuredEpisode ? (
            <div className="w-full h-56 bg-cricket-green/10 rounded">
              <Skeleton className="w-full h-full" />
            </div>
          ) : (
            <SpotifyPlayer spotifyId={featuredEpisode.spotifyId} />
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))
          ) : (
            episodes && episodes.length > 0 ? episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            )) : 
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No episodes available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestEpisodes;
