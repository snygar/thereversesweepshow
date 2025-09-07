import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Episode } from "@/lib/types";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import SpotifyPlayer from "@/components/episodes/SpotifyPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { 
  useSpotifyShowEpisodes, 
  formatSpotifyEpisode, 
  type SpotifyEpisode,
  PODCAST_SHOW_ID,
  PODCAST_INFO
} from "@/hooks/use-spotify-episodes";

const Episodes = () => {
  const [page, setPage] = useState(1);
  const limit = 6; // Episodes per page
  const offset = (page - 1) * limit;

  // Fetch episodes from Spotify
  const { data, isLoading } = useSpotifyShowEpisodes(PODCAST_SHOW_ID, limit, offset);
  
  // Episodes are already formatted from the hook
  const formattedEpisodes = data?.episodes || [];
    
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);
  const latestEpisode = formattedEpisodes[0];

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Helmet>
        <title>Episodes - The Reverse Sweep Show</title>
        <meta name="description" content="Listen to all episodes of The Reverse Sweep Show, the cricket podcast bringing you deep analysis, player interviews and what-if scenarios." />
      </Helmet>

      <div className="bg-cricket-green py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold text-white mb-6">Episodes</h1>
          <p className="text-cricket-offwhite text-lg max-w-3xl">
            Listen to all episodes of The Reverse Sweep Show. New episodes released weekly.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="w-full mb-12">
            <Skeleton className="h-[232px] w-full" />
          </div>
        ) : latestEpisode ? (
          <div className="bg-cricket-gray p-6 rounded-lg mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4">Latest Episode</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <SpotifyPlayer spotifyId={latestEpisode.spotifyId} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    {new Date(latestEpisode.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="text-xs text-gray-500">{latestEpisode.duration}</span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{latestEpisode.title}</h3>
                <p className="text-gray-600 mb-4">{latestEpisode.description}</p>
                <Link href={`/episodes/${latestEpisode.slug}`}>
                  <Button className="bg-cricket-green text-white hover:bg-cricket-green/90">
                    View Episode Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
        
        <h2 className="text-2xl font-heading font-bold mb-6">All Episodes</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, index) => (
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
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {formattedEpisodes.map((episode: Episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Episodes;
