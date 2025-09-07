import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Helmet } from "react-helmet";
import { ArrowLeft, Plus, FileText } from "lucide-react";
import { Link } from "wouter";

const blogPostFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  author: z.string().min(2, "Author name is required"),
  category: z.enum(["history", "previews", "reflections", "what-ifs"], {
    required_error: "Please select a category",
  }),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

const BlogAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      author: "The Reverse Sweep Show",
      category: "reflections",
      imageUrl: "",
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: BlogPostFormValues) => {
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      const postData = {
        ...data,
        slug,
        date: new Date().toISOString(),
      };
      
      return apiRequest("/api/blog", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (newPost) => {
      toast({
        title: "Success!",
        description: "Blog post created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BlogPostFormValues) => {
    createPostMutation.mutate(data);
  };

  const categories = [
    { value: "history", label: "History", description: "Cricket heritage and legendary moments" },
    { value: "previews", label: "Previews", description: "Upcoming matches and series analysis" },
    { value: "reflections", label: "Reflections", description: "Deep thoughts on cricket moments" },
    { value: "what-ifs", label: "What Ifs", description: "Alternative cricket scenarios" }
  ];

  return (
    <>
      <Helmet>
        <title>Add Blog Post - The Reverse Sweep Show</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link href="/blog">
                <Button variant="ghost" className="text-cricket-green hover:text-cricket-green hover:bg-cricket-green/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <div className="flex items-center text-cricket-green">
                <FileText className="w-5 h-5 mr-2" />
                <span className="font-medium">Blog Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cricket-green">
                <Plus className="w-5 h-5 mr-2" />
                Add New Blog Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter blog post title..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  <div>
                                    <div className="font-medium">{category.label}</div>
                                    <div className="text-sm text-gray-500">{category.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author *</FormLabel>
                          <FormControl>
                            <Input placeholder="Author name..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief summary of the blog post (will be shown in previews)..."
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your blog post content here. You can use line breaks for paragraphs..."
                            className="min-h-[300px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={createPostMutation.isPending}
                      className="bg-cricket-green text-white hover:bg-cricket-green/90"
                    >
                      {createPostMutation.isPending ? "Creating..." : "Create Blog Post"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                      disabled={createPostMutation.isPending}
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p><strong>Title:</strong> Keep it engaging and descriptive</p>
              <p><strong>Category:</strong> Choose the most appropriate category for your content</p>
              <p><strong>Excerpt:</strong> Write a compelling summary that will appear in blog previews</p>
              <p><strong>Content:</strong> Write your full article. Use line breaks to separate paragraphs</p>
              <p><strong>Image URL:</strong> Optional. Use a public image URL for better visual appeal</p>
              <p className="text-cricket-green font-medium">The slug will be automatically generated from your title</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BlogAdmin;