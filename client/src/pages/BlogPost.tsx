import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl?: string;
  slug: string;
}

const BlogPost = () => {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['/api/blog', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) throw new Error('Blog post not found');
      return response.json();
    },
    enabled: !!slug
  });

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'history': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'previews': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reflections': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'what-ifs': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cricket-green"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or may have been removed.
          </p>
          <Link href="/blog">
            <Button className="bg-cricket-green text-white hover:bg-cricket-green/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - The Reverse Sweep Show</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.imageUrl && <meta name="twitter:image" content={post.imageUrl} />}
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <Link href="/blog">
              <Button variant="ghost" className="text-cricket-green hover:text-cricket-green hover:bg-cricket-green/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Article */}
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="outline" className={getCategoryColor(post.category)}>
                {post.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {estimateReadingTime(post.content)} min read
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-cricket-text mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium">By {post.author}</span>
            </div>

            {post.imageUrl && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/### (.*?)(?=\n|$)/g, '<h3 class="text-xl font-bold text-cricket-green mt-8 mb-4">$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/\n/g, '<br>')
                  .replace(/^/, '<p class="mb-4">')
                  .replace(/$/, '</p>')
              }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-cricket-green/5 p-6 rounded-lg">
              <h3 className="text-lg font-heading font-bold text-cricket-green mb-2">
                Enjoyed this article?
              </h3>
              <p className="text-gray-600 mb-4">
                Listen to more cricket insights and analysis on The Reverse Sweep Show podcast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/episodes">
                  <Button className="bg-cricket-green text-white hover:bg-cricket-green/90">
                    Browse Episodes
                  </Button>
                </Link>
                <Link href="#newsletter">
                  <Button variant="outline" className="border-cricket-green text-cricket-green hover:bg-cricket-green hover:text-white">
                    Subscribe to Newsletter
                  </Button>
                </Link>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
};

export default BlogPost;