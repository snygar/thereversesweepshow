import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Comment } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CommentListProps {
  episodeId: string;
}

export default function CommentList({ episodeId }: CommentListProps) {
  const [activeTab, setActiveTab] = useState<"newest" | "top">("newest");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading, error } = useQuery<Comment[]>({
    queryKey: ["/api/comments", episodeId, activeTab],
    queryFn: async () => {
      const response = await fetch(`/api/comments/${episodeId}?sortBy=${activeTab}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      return response.json();
    },
    enabled: !!episodeId,
  });

  const upvoteMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return apiRequest<Comment>(`/api/comments/${commentId}/upvote`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comments", episodeId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upvote the comment",
        variant: "destructive",
      });
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return apiRequest<Comment>(`/api/comments/${commentId}/downvote`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comments", episodeId] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to downvote the comment",
        variant: "destructive",
      });
    },
  });

  const handleUpvote = (commentId: number) => {
    upvoteMutation.mutate(commentId);
  };

  const handleDownvote = (commentId: number) => {
    downvoteMutation.mutate(commentId);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "newest" | "top");
  };

  if (isLoading) {
    return <div className="py-4">Loading comments...</div>;
  }

  if (error) {
    return <div className="py-4 text-red-500">Error loading comments</div>;
  }

  return (
    <div className="mt-10">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center">
          <MessageSquare className="mr-2" size={20} />
          Comments ({comments.length})
        </h3>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-end mb-4">
          <TabsList>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="top">Top Rated</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="newest" className="mt-0 p-0">
          {comments.length === 0 ? (
            <div className="text-center py-8 bg-white/5 rounded-lg">
              <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: Comment) => (
                <div key={comment.id} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">
                      {comment.name || "Anonymous User"}
                    </h4>
                    <span className="text-sm text-zinc-400">
                      {format(new Date(comment.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 mb-3">{comment.content}</p>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpvote(comment.id)}
                      className="flex items-center space-x-1 text-sm h-7"
                    >
                      <ThumbsUp size={14} />
                      <span>{comment.upvotes}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownvote(comment.id)}
                      className="flex items-center space-x-1 text-sm h-7"
                    >
                      <ThumbsDown size={14} />
                      <span>{comment.downvotes}</span>
                    </Button>
                    
                    <span className="text-zinc-500">
                      Score: {comment.upvotes - comment.downvotes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="top" className="mt-0 p-0">
          {comments.length === 0 ? (
            <div className="text-center py-8 bg-white/5 rounded-lg">
              <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: Comment) => (
                <div key={comment.id} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">
                      {comment.name || "Anonymous User"}
                    </h4>
                    <span className="text-sm text-zinc-400">
                      {format(new Date(comment.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 mb-3">{comment.content}</p>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpvote(comment.id)}
                      className="flex items-center space-x-1 text-sm h-7"
                    >
                      <ThumbsUp size={14} />
                      <span>{comment.upvotes}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownvote(comment.id)}
                      className="flex items-center space-x-1 text-sm h-7"
                    >
                      <ThumbsDown size={14} />
                      <span>{comment.downvotes}</span>
                    </Button>
                    
                    <span className="text-zinc-500">
                      Score: {comment.upvotes - comment.downvotes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}