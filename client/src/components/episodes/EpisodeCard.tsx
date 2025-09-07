import { Link } from "wouter";
import { Headphones } from "lucide-react";
import { type Episode } from "@/lib/types";
import { createExcerpt } from "@/lib/textUtils";

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  const { id, title, description, date, duration, isNew, slug, imageUrl } = episode;
  
  // Debug logging
  console.log('EpisodeCard - episode:', title, 'imageUrl:', imageUrl);
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-cricket-green/10 relative overflow-hidden">
        {imageUrl ? (
          <div className="w-full h-full relative">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
              onLoad={() => console.log('Image loaded successfully:', imageUrl)}
              onError={(e) => {
                console.error('Image failed to load:', imageUrl);
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                const parent = target.parentElement!;
                target.style.display = 'none';
                parent.classList.add('flex', 'items-center', 'justify-center');
                parent.innerHTML = `
                  <svg class="text-cricket-green text-4xl" width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4L10.6 5.4L16.2 11H4V13H16.2L10.6 18.6L12 20L20 12L12 4Z" fill="currentColor" />
                  </svg>
                `;
              }}
            />
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {imageUrl ? 'IMG' : 'NO IMG'}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <svg 
                className="text-cricket-green text-4xl mx-auto mb-2"
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 4L10.6 5.4L16.2 11H4V13H16.2L10.6 18.6L12 20L20 12L12 4Z" 
                  fill="currentColor" 
                />
              </svg>
              <div className="text-xs text-red-500">No Image URL</div>
            </div>
          </div>
        )}
        {isNew ? (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-xs text-white font-medium bg-cricket-gold px-2 py-1 rounded">NEW</span>
          </div>
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{formattedDate}</span>
          <span className="text-xs text-gray-500">{duration}</span>
        </div>
        <h3 className="text-xl font-heading font-bold mb-2 hover:text-cricket-green transition-colors duration-200">
          <Link href={`/episodes/${slug}`} className="hover:text-cricket-green">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4">{createExcerpt(description, 120)}</p>
        <Link href={`/episodes/${slug}`} className="inline-block text-cricket-green font-medium hover:text-cricket-gold transition-colors duration-200">
          Listen Now <Headphones className="inline ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default EpisodeCard;
