import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
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

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['/api/blog', selectedCategory],
    queryFn: async () => {
      const url = selectedCategory 
        ? `/api/blog?category=${selectedCategory}` 
        : '/api/blog';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      const data = await response.json();
      return data.posts || [];
    }
  });

  const categories = [
    { id: 'history', name: 'History', description: 'Cricket heritage and legendary moments' },
    { id: 'previews', name: 'Previews', description: 'Upcoming matches and series analysis' },
    { id: 'reflections', name: 'Reflections', description: 'Deep thoughts on cricket moments' },
    { id: 'what-ifs', name: 'What Ifs', description: 'Alternative cricket scenarios' }
  ];

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

  return (
    <>
      <Helmet>
        <title>Blog - The Reverse Sweep Show</title>
        <meta name="description" content="Cricket insights, analysis, and what-if scenarios from The Reverse Sweep Show. Explore history, previews, reflections, and alternative cricket stories." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-cricket-green text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Cricket Insights & Analysis
              </h1>
              <p className="text-xl text-cricket-offwhite mb-8">
                Deep dives into cricket's greatest moments, alternative scenarios, and thoughtful reflections on the beautiful game.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-cricket-green text-white" : ""}
              >
                All Articles
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-cricket-green text-white" : ""}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Descriptions */}
          {selectedCategory && (
            <div className="mb-12 text-center">
              <div className="max-w-2xl mx-auto">
                {categories.map((category) => (
                  selectedCategory === category.id && (
                    <div key={category.id} className="bg-white p-6 rounded-lg shadow-sm border">
                      <h2 className="text-2xl font-heading font-bold text-cricket-green mb-2">
                        {category.name}
                      </h2>
                      <p className="text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Blog Posts */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cricket-green"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: BlogPost) => (
                <Card key={post.id} className="hover:shadow-lg transition-all duration-300 group">
                  {post.imageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.date)}
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-cricket-text group-hover:text-cricket-green transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-cricket-green hover:text-cricket-green hover:bg-cricket-green/10">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-heading font-bold text-gray-800 mb-4">
                  {selectedCategory ? `No ${categories.find(c => c.id === selectedCategory)?.name} articles yet` : 'No articles yet'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {selectedCategory 
                    ? `We're working on some great ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} content. Check back soon!`
                    : "We're working on some great cricket content. Check back soon for insightful articles and analysis!"
                  }
                </p>
                <Link href="/episodes">
                  <Button className="bg-cricket-green text-white hover:bg-cricket-green/90">
                    Listen to Episodes Instead
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;