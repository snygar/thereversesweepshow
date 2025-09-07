import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { type BlogPost } from "@/lib/types";
import ArticleCard from "@/components/blog/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPreview = () => {
  const { data: featuredArticles, isLoading: isLoadingFeatured } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/featured'],
    queryFn: async () => {
      const response = await fetch('/api/blog/featured');
      return response.json();
    }
  });

  const { data: recentArticles, isLoading: isLoadingRecent } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/recent'],
    queryFn: async () => {
      const response = await fetch('/api/blog/recent');
      return response.json();
    }
  });

  return (
    <section className="py-16 bg-cricket-gray">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-cricket-text">Featured Articles</h2>
          <Link href="/blog" className="text-cricket-green hover:text-cricket-gold font-medium flex items-center transition-colors duration-200">
            Browse All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {isLoadingFeatured ? (
            // Loading skeletons for featured articles
            Array(2).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <Skeleton className="md:w-2/5 h-48 md:h-auto" />
                  <div className="p-6 md:w-3/5">
                    <div className="flex items-center mb-2">
                      <Skeleton className="h-6 w-24 mr-2" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            featuredArticles?.map((article) => (
              <ArticleCard key={article.id} article={article} featured />
            ))
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoadingRecent ? (
            // Loading skeletons for recent articles
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                  <Skeleton className="h-6 w-24 mr-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : (
            recentArticles?.map((article) => (
              <div key={article.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium bg-cricket-green/10 text-cricket-green px-2 py-1 rounded mr-2">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 hover:text-cricket-green transition-colors duration-200">
                  <Link href={`/blog/${article.slug}`} className="hover:text-cricket-green">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">{article.excerpt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
