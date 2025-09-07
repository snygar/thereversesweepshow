import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Schema for comments - now requiring name and email
const commentSchema = z.object({
  episodeId: z.string().min(1, "Episode ID is required"),
  content: z.string().min(5, "Comment must be at least 5 characters").max(500, "Comment must be less than 500 characters"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
  episodeId: string;
  onCommentAdded?: () => void;
}

export default function CommentForm({ episodeId, onCommentAdded }: CommentFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      episodeId,
      content: "",
      name: "",
      email: "",
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (data: CommentFormValues) => {
      return apiRequest<any>("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comments", episodeId] });
      form.reset();
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      });
      if (onCommentAdded) {
        onCommentAdded();
      }
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "There was an error adding your comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: CommentFormValues) {
    addCommentMutation.mutate(data);
  }

  return (
    <div className="bg-white/5 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts on this episode..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your email will not be displayed publicly
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-2"
            disabled={addCommentMutation.isPending}
          >
            {addCommentMutation.isPending ? "Submitting..." : "Post Comment"}
          </Button>
        </form>
      </Form>
    </div>
  );
}