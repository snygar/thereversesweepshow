import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertEpisodeSchema, insertBlogPostSchema, insertSubscriberSchema, insertCommentSchema } from "@shared/schema";
import * as spotifyService from "./spotifyService";
import { generateEpisodeSummary } from "./openaiService";
import path from "path";


export async function registerRoutes(app: Express): Promise<Server> {
  // Episodes routes
  app.get("/api/episodes", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const { episodes, totalCount } = await storage.getEpisodes(page, limit);
      res.json({ episodes, totalCount });
    } catch (error) {
      console.error("Error fetching episodes:", error);
      res.status(500).json({ message: "Failed to fetch episodes" });
    }
  });

  app.get("/api/episodes/featured", async (req, res) => {
    try {
      const featuredEpisodes = await storage.getFeaturedEpisodes();
      res.json(featuredEpisodes);
    } catch (error) {
      console.error("Error fetching featured episodes:", error);
      res.status(500).json({ message: "Failed to fetch featured episodes" });
    }
  });

  app.get("/api/episodes/:slug", async (req, res) => {
    try {
      const episode = await storage.getEpisodeBySlug(req.params.slug);
      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }
      res.json(episode);
    } catch (error) {
      console.error("Error fetching episode:", error);
      res.status(500).json({ message: "Failed to fetch episode" });
    }
  });

  app.post("/api/episodes", async (req, res) => {
    try {
      const validatedData = insertEpisodeSchema.parse(req.body);
      const episode = await storage.createEpisode(validatedData);
      res.status(201).json(episode);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid episode data", errors: error.errors });
      }
      console.error("Error creating episode:", error);
      res.status(500).json({ message: "Failed to create episode" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const category = req.query.category as string | null;
      const { posts, totalCount } = await storage.getBlogPosts(page, limit, category);
      res.json({ posts, totalCount });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/featured", async (req, res) => {
    try {
      const featuredPosts = await storage.getFeaturedBlogPosts();
      res.json(featuredPosts);
    } catch (error) {
      console.error("Error fetching featured blog posts:", error);
      res.status(500).json({ message: "Failed to fetch featured blog posts" });
    }
  });

  app.get("/api/blog/recent", async (req, res) => {
    try {
      const recentPosts = await storage.getRecentBlogPosts();
      res.json(recentPosts);
    } catch (error) {
      console.error("Error fetching recent blog posts:", error);
      res.status(500).json({ message: "Failed to fetch recent blog posts" });
    }
  });

  app.get("/api/blog/categories", async (req, res) => {
    try {
      const categories = await storage.getBlogCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
      res.status(500).json({ message: "Failed to fetch blog categories" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  // Subscribe route
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      
      if (existingSubscriber) {
        return res.status(409).json({ message: "Email already subscribed" });
      }

      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email", errors: error.errors });
      }
      console.error("Error subscribing:", error);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  // Contact route (simply returns success for now)
  app.post("/api/contact", async (req, res) => {
    try {
      const contactSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        subject: z.string().min(2),
        message: z.string().min(10),
      });
      
      contactSchema.parse(req.body);
      
      // In a real app, you would store this in the database or send an email
      res.status(200).json({ message: "Message received" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Failed to process contact form" });
    }
  });

  // Spotify API routes
  app.get("/api/spotify/show/:showId", async (req, res) => {
    try {
      const showId = req.params.showId;
      const show = await spotifyService.getShow(showId);
      res.json(show);
    } catch (error) {
      console.error("Error fetching Spotify show:", error);
      res.status(500).json({ message: "Failed to fetch Spotify show" });
    }
  });

  app.get("/api/spotify/show/:showId/episodes", async (req, res) => {
    try {
      const showId = req.params.showId;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      
      // Check if showId is valid
      if (!showId || showId.trim() === '') {
        return res.status(400).json({ 
          message: "Invalid show ID", 
          error: "Show ID is required"
        });
      }
      
      // Get both episodes and show data to include show image as fallback
      const [episodes, show] = await Promise.all([
        spotifyService.getShowEpisodes(showId, limit, offset),
        spotifyService.getShow(showId)
      ]);
      
      // Add show image URL to the response for use as fallback
      const responseData = {
        ...episodes,
        show_image_url: show.images?.[0]?.url
      };
      
      res.json(responseData);
    } catch (error: any) {
      console.error("Error fetching Spotify show episodes:", error);
      
      // Handle Spotify API errors
      if (error?.body?.error) {
        return res.status(error.body.error.status || 500).json({ 
          message: "Spotify API error", 
          error: error.body.error.message,
          details: error.message
        });
      }
      
      res.status(500).json({ 
        message: "Failed to fetch Spotify show episodes",
        error: error?.message || "Unknown error"
      });
    }
  });

  app.get("/api/spotify/episode/:episodeId", async (req, res) => {
    try {
      const episodeId = req.params.episodeId;
      
      // Check if episodeId is valid
      if (!episodeId || episodeId.trim() === '') {
        return res.status(400).json({ 
          message: "Invalid episode ID", 
          error: "Episode ID is required"
        });
      }
      
      // Try to get the episode
      const episode = await spotifyService.getEpisode(episodeId);
      res.json(episode);
    } catch (error: any) {
      console.error("Error fetching Spotify episode:", error);
      
      // Handle Spotify API errors
      if (error?.body?.error) {
        return res.status(error.body.error.status || 500).json({ 
          message: "Spotify API error", 
          error: error.body.error.message,
          details: error.message
        });
      }
      
      res.status(500).json({ 
        message: "Failed to fetch Spotify episode",
        error: error?.message || "Unknown error"
      });
    }
  });

  app.get("/api/spotify/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const results = await spotifyService.searchShows(query, limit, offset);
      res.json(results);
    } catch (error) {
      console.error("Error searching Spotify shows:", error);
      res.status(500).json({ message: "Failed to search Spotify shows" });
    }
  });
  
  // AI Summary route for stored episodes
  app.post("/api/episodes/:id/generate-summary", async (req, res) => {
    try {
      const episodeId = parseInt(req.params.id);
      
      if (isNaN(episodeId)) {
        return res.status(400).json({ message: "Invalid episode ID" });
      }
      
      // Get the episode
      const episode = await storage.getEpisodeById(episodeId);
      
      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }
      
      // Generate the AI summary
      const summary = await generateEpisodeSummary(episode.title, episode.description);
      
      // Update the episode with the AI summary
      const updatedEpisode = await storage.updateEpisodeAiSummary(episodeId, summary);
      
      res.json({
        success: true,
        episode: updatedEpisode,
        summary
      });
    } catch (error) {
      console.error("Error generating AI summary:", error);
      res.status(500).json({ 
        message: "Failed to generate AI summary",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // AI Summary route for Spotify episodes
  app.post("/api/spotify/episodes/:spotifyId/generate-summary", async (req, res) => {
    try {
      const spotifyId = req.params.spotifyId;
      
      if (!spotifyId) {
        return res.status(400).json({ message: "Invalid Spotify episode ID" });
      }
      
      // Get the episode from Spotify
      let spotifyEpisode;
      try {
        spotifyEpisode = await spotifyService.getEpisode(spotifyId);
      } catch (spotifyError) {
        console.error("Error fetching episode from Spotify:", spotifyError);
        return res.status(404).json({ message: "Episode not found on Spotify" });
      }
      
      if (!spotifyEpisode) {
        return res.status(404).json({ message: "Episode not found on Spotify" });
      }
      
      // Generate the AI summary
      const summary = await generateEpisodeSummary(
        spotifyEpisode.name, 
        spotifyEpisode.description
      );
      
      res.json({
        success: true,
        summary
      });
    } catch (error) {
      console.error("Error generating AI summary for Spotify episode:", error);
      res.status(500).json({ 
        message: "Failed to generate AI summary",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Comment routes
  app.get("/api/comments/:episodeId", async (req, res) => {
    try {
      const episodeId = req.params.episodeId;
      const sortBy = (req.query.sortBy as 'newest' | 'top') || 'newest';
      
      if (!episodeId) {
        return res.status(400).json({ message: "Episode ID is required" });
      }
      
      // Get comments for the episode
      const comments = await storage.getCommentsByEpisodeId(episodeId, sortBy);
      
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ 
        message: "Failed to fetch comments",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  app.post("/api/comments", async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(validatedData);
      
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid comment data", 
          errors: error.errors 
        });
      }
      
      console.error("Error creating comment:", error);
      res.status(500).json({ 
        message: "Failed to create comment",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  app.post("/api/comments/:id/upvote", async (req, res) => {
    try {
      const commentId = parseInt(req.params.id);
      
      if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      
      const updatedComment = await storage.upvoteComment(commentId);
      
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
      res.json(updatedComment);
    } catch (error) {
      console.error("Error upvoting comment:", error);
      res.status(500).json({ 
        message: "Failed to upvote comment",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  app.post("/api/comments/:id/downvote", async (req, res) => {
    try {
      const commentId = parseInt(req.params.id);
      
      if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      
      const updatedComment = await storage.downvoteComment(commentId);
      
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
      res.json(updatedComment);
    } catch (error) {
      console.error("Error downvoting comment:", error);
      res.status(500).json({ 
        message: "Failed to downvote comment",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // SEO routes - serve sitemap.xml and robots.txt
  app.get("/sitemap.xml", (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.sendFile(path.join(process.cwd(), 'client/public/sitemap.xml'));
  });

  app.get("/robots.txt", (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(path.join(process.cwd(), 'client/public/robots.txt'));
  });

  const httpServer = createServer(app);

  return httpServer;
}
