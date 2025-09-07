import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SpotifyPlayerProps {
  spotifyId: string;
  height?: number;
}

const SpotifyPlayer = ({ spotifyId, height = 232 }: SpotifyPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (in a real app, this would be when the iframe actually loads)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [spotifyId]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full" style={{ height: `${height}px` }}>
          <Skeleton className="w-full h-full" />
        </div>
      )}
      <iframe 
        src={`https://open.spotify.com/embed/episode/${spotifyId}?utm_source=generator&theme=0`}
        width="100%" 
        height={height} 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={handleIframeLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
        title="Spotify Player"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
