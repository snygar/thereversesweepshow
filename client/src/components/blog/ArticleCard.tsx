import { Link } from "wouter";
import { ArrowRight, FileText } from "lucide-react";
import { type BlogPost } from "@/lib/types";

interface ArticleCardProps {
  article: BlogPost;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const { title, excerpt, date, category, slug } = article;
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const categoryClass = category === 'WHAT IF' ? 
    'bg-cricket-gold/20 text-cricket-gold' : 
    'bg-cricket-green/10 text-cricket-green';

  if (featured) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="md:flex">
          <div className="md:w-2/5 h-48 md:h-auto bg-cricket-green/10 relative flex items-center justify-center">
            <FileText className="text-cricket-green text-4xl" />
          </div>
          <div className="p-6 md:w-3/5">
            <div className="flex items-center mb-2">
              <span className={`text-xs font-medium ${categoryClass} px-2 py-1 rounded mr-2`}>
                {category}
              </span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
            <h3 className="text-xl font-heading font-bold mb-3 hover:text-cricket-green transition-colors duration-200">
              <Link href={`/blog/${slug}`} className="hover:text-cricket-green">
                {title}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
            <Link href={`/blog/${slug}`} className="inline-block text-cricket-green font-medium hover:text-cricket-gold transition-colors duration-200">
              Read Article <ArrowRight className="inline ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-3">
        <span className={`text-xs font-medium ${categoryClass} px-2 py-1 rounded mr-2`}>
          {category}
        </span>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <h3 className="text-lg font-heading font-bold mb-2 hover:text-cricket-green transition-colors duration-200">
        <Link href={`/blog/${slug}`} className="hover:text-cricket-green">
          {title}
        </Link>
      </h3>
      <p className="text-gray-600 text-sm">{excerpt}</p>
    </div>
  );
};

export default ArticleCard;
