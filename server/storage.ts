import { 
  users, type User, type InsertUser,
  episodes, type Episode, type InsertEpisode,
  blogPosts, type BlogPost, type InsertBlogPost,
  subscribers, type Subscriber, type InsertSubscriber,
  comments, type Comment, type InsertComment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Episode operations
  getEpisodes(page: number, limit: number): Promise<{episodes: Episode[], totalCount: number}>;
  getEpisodeById(id: number): Promise<Episode | undefined>;
  getEpisodeBySlug(slug: string): Promise<Episode | undefined>;
  getFeaturedEpisodes(): Promise<Episode[]>;
  createEpisode(episode: InsertEpisode): Promise<Episode>;
  updateEpisodeAiSummary(id: number, aiSummary: string): Promise<Episode | undefined>;
  
  // Blog operations
  getBlogPosts(page: number, limit: number, category?: string | null): Promise<{posts: BlogPost[], totalCount: number}>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getFeaturedBlogPosts(): Promise<BlogPost[]>;
  getRecentBlogPosts(): Promise<BlogPost[]>;
  getBlogCategories(): Promise<string[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Subscriber operations
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  
  // Comment operations
  getCommentsByEpisodeId(episodeId: string, sortBy?: 'newest' | 'top'): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  upvoteComment(id: number): Promise<Comment | undefined>;
  downvoteComment(id: number): Promise<Comment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private episodes: Map<number, Episode>;
  private blogPosts: Map<number, BlogPost>;
  private subscribers: Map<number, Subscriber>;
  private comments: Map<number, Comment>;
  private userCounter: number;
  private episodeCounter: number;
  private blogPostCounter: number;
  private subscriberCounter: number;
  private commentCounter: number;

  constructor() {
    this.users = new Map();
    this.episodes = new Map();
    this.blogPosts = new Map();
    this.subscribers = new Map();
    this.comments = new Map();
    this.userCounter = 1;
    this.episodeCounter = 1;
    this.blogPostCounter = 1;
    this.subscriberCounter = 1;
    this.commentCounter = 1;
    
    // Add sample data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Episode operations
  async getEpisodes(page: number, limit: number): Promise<{episodes: Episode[], totalCount: number}> {
    const allEpisodes = Array.from(this.episodes.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const episodes = allEpisodes.slice(start, end);
    
    return {
      episodes,
      totalCount: allEpisodes.length
    };
  }

  async getEpisodeById(id: number): Promise<Episode | undefined> {
    return this.episodes.get(id);
  }

  async getEpisodeBySlug(slug: string): Promise<Episode | undefined> {
    return Array.from(this.episodes.values()).find(
      (episode) => episode.slug === slug,
    );
  }

  async getFeaturedEpisodes(): Promise<Episode[]> {
    return Array.from(this.episodes.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

  async createEpisode(insertEpisode: InsertEpisode): Promise<Episode> {
    const id = this.episodeCounter++;
    const episode: Episode = {
      ...insertEpisode,
      id,
    };
    this.episodes.set(id, episode);
    return episode;
  }
  
  async updateEpisodeAiSummary(id: number, aiSummary: string): Promise<Episode | undefined> {
    const episode = this.episodes.get(id);
    if (!episode) {
      return undefined;
    }
    
    const updatedEpisode: Episode = {
      ...episode,
      aiSummary
    };
    
    this.episodes.set(id, updatedEpisode);
    return updatedEpisode;
  }

  // Blog operations
  async getBlogPosts(
    page: number, 
    limit: number, 
    category?: string | null
  ): Promise<{posts: BlogPost[], totalCount: number}> {
    let allPosts = Array.from(this.blogPosts.values());
    
    if (category) {
      allPosts = allPosts.filter(post => post.category === category);
    }
    
    allPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const posts = allPosts.slice(start, end);
    
    return {
      posts,
      totalCount: allPosts.length
    };
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
  }

  async getRecentBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

  async getBlogCategories(): Promise<string[]> {
    const categories = new Set<string>();
    
    for (const post of this.blogPosts.values()) {
      categories.add(post.category);
    }
    
    return Array.from(categories);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostCounter++;
    const post: BlogPost = {
      ...insertBlogPost,
      id,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  // Subscriber operations
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberCounter++;
    const subscriber: Subscriber = {
      ...insertSubscriber,
      id,
      date: new Date()
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
  
  // Comment operations
  async getCommentsByEpisodeId(episodeId: string, sortBy: 'newest' | 'top' = 'newest'): Promise<Comment[]> {
    let comments = Array.from(this.comments.values()).filter(
      comment => comment.episodeId === episodeId
    );
    
    if (sortBy === 'newest') {
      comments.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'top') {
      comments.sort((a, b) => 
        (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      );
    }
    
    return comments;
  }
  
  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.commentCounter++;
    const comment: Comment = {
      ...insertComment,
      id,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      name: insertComment.name || null,
      email: insertComment.email || null
    };
    
    this.comments.set(id, comment);
    return comment;
  }
  
  async upvoteComment(id: number): Promise<Comment | undefined> {
    const comment = this.comments.get(id);
    if (!comment) {
      return undefined;
    }
    
    const updatedComment: Comment = {
      ...comment,
      upvotes: comment.upvotes + 1
    };
    
    this.comments.set(id, updatedComment);
    return updatedComment;
  }
  
  async downvoteComment(id: number): Promise<Comment | undefined> {
    const comment = this.comments.get(id);
    if (!comment) {
      return undefined;
    }
    
    const updatedComment: Comment = {
      ...comment,
      downvotes: comment.downvotes + 1
    };
    
    this.comments.set(id, updatedComment);
    return updatedComment;
  }

  // Initialize sample data
  private initializeData() {
    // Sample Comments 
    const sampleComments: InsertComment[] = [
      {
        episodeId: "7kv6KkjJlQNLQs9JxKVmC4", // Spin Bowling episode
        content: "Shane Warne was absolutely the GOAT of spin bowling! This episode brought back so many memories of his incredible deliveries.",
        name: "CricketFan123",
        email: "fan@cricket.com"
      },
      {
        episodeId: "7kv6KkjJlQNLQs9JxKVmC4",
        content: "I disagree with your take on Warne vs Murali. Murali's stats speak for themselves!",
        name: null,
        email: null
      },
      {
        episodeId: "7kv6KkjJlQNLQs9JxKVmC4",
        content: "Great analysis of grip techniques. I've been trying to teach my son the flipper and this really helped explain the wrist position.",
        name: "CoachDave",
        email: "coach@cricket.com"
      },
      {
        episodeId: "2mj7xLF6bzCARKxhLvW5BO", // India vs Pakistan
        content: "This hypothetical match-up would have been the most watched cricket game in history!",
        name: "CricketHistorian",
        email: null
      },
      {
        episodeId: "2mj7xLF6bzCARKxhLvW5BO",
        content: "The political significance of such a final would have been incredible. Cricket diplomacy at its finest.",
        name: null,
        email: null
      }
    ];
    
    // Insert sample comments
    for (const comment of sampleComments) {
      this.createComment(comment);
    }
    
    // Sample Episodes
    const sampleEpisodes: InsertEpisode[] = [
      {
        title: "The Art of Spin Bowling with Shane Warne",
        description: "A deep dive into the techniques and strategies behind exceptional spin bowling, featuring our analysis of Shane Warne's legendary career.",
        date: new Date("2023-06-10"),
        duration: "45 min",
        spotifyUrl: "https://open.spotify.com/episode/sample1",
        spotifyId: "7kv6KkjJlQNLQs9JxKVmC4",
        imageUrl: null,
        isNew: 1,
        transcript: "In this episode, we discuss the art of spin bowling, analyzing the techniques that made Shane Warne one of the greatest spin bowlers of all time. We break down his grip, approach, and strategic thinking.\n\nGuest commentator: \"Shane had this incredible ability to read the batsman's mind. He was always one step ahead.\"\n\nHost: \"It wasn't just the technical skill, it was the psychological warfare. He would tell batsmen what he was going to do, and then do exactly that - and they still couldn't play it!\"\n\nWe also explore Warne's legacy and influence on the next generation of spin bowlers around the world.",
        aiSummary: "• Shane Warne revolutionized spin bowling with his mastery of the leg break, flipper, and slider\n• His ability to combine technical skill with psychological tactics made him uniquely effective\n• Modern spin bowlers study Warne's grip techniques and wrist position\n• Warne's influence extended beyond Australia to impact spin bowling worldwide\n• The episode highlights how Warne's approach changed captains' attitude toward using spin as an attacking option",
        slug: "art-of-spin-bowling-shane-warne"
      },
      {
        title: "What If: India vs Pakistan 2019 World Cup Final",
        description: "We explore the fascinating alternate reality scenario of what could have happened if these cricket rivals had met in the 2019 World Cup final.",
        date: new Date("2023-06-03"),
        duration: "38 min",
        spotifyUrl: "https://open.spotify.com/episode/sample2",
        spotifyId: "2mj7xLF6bzCARKxhLvW5BO",
        imageUrl: null,
        isNew: 0,
        transcript: null,
        aiSummary: null,
        slug: "what-if-india-vs-pakistan-2019-world-cup-final"
      },
      {
        title: "T20 Strategy: The Evolving Game",
        description: "How T20 cricket has transformed batting techniques, bowling strategies, and field placements in the modern game.",
        date: new Date("2023-05-27"),
        duration: "52 min",
        spotifyUrl: "https://open.spotify.com/episode/sample3",
        spotifyId: "1dmVPmqYOOHqVRg7ANrpKo",
        imageUrl: null,
        isNew: 0,
        transcript: null,
        aiSummary: null,
        slug: "t20-strategy-evolving-game"
      },
      {
        title: "The Rise of Women's Cricket",
        description: "From marginalized beginnings to growing audiences and professional contracts, we chart the remarkable rise of women's cricket globally.",
        date: new Date("2023-05-20"),
        duration: "41 min",
        spotifyUrl: "https://open.spotify.com/episode/sample4",
        spotifyId: "4FqUgtCgLFjcOoCYfuXdAY",
        imageUrl: null,
        isNew: 0,
        transcript: null,
        aiSummary: null,
        slug: "rise-of-womens-cricket"
      },
      {
        title: "Cricket Analytics: Beyond the Numbers",
        description: "How data science and advanced analytics are changing the way teams prepare, scout talent, and execute their strategies on the field.",
        date: new Date("2023-05-13"),
        duration: "47 min",
        spotifyUrl: "https://open.spotify.com/episode/sample5",
        spotifyId: "6AVhHPgQqPSDQiUGsKveYB",
        imageUrl: null,
        isNew: 0,
        transcript: null,
        aiSummary: null,
        slug: "cricket-analytics-beyond-numbers"
      },
      {
        title: "The Greatest Fast Bowlers of All Time",
        description: "We rank and analyze the careers of cricket's most fearsome pace bowlers, from the West Indian greats to modern speedsters.",
        date: new Date("2023-05-06"),
        duration: "56 min",
        spotifyUrl: "https://open.spotify.com/episode/sample6",
        spotifyId: "0oWrIQvN9rKrTCNMhODELB",
        imageUrl: null,
        isNew: 0,
        transcript: null,
        aiSummary: null,
        slug: "greatest-fast-bowlers-all-time"
      }
    ];
    
    // No sample blog posts - only authentic content will be added via the admin interface
    
    // Add episodes to storage
    for (const episodeData of sampleEpisodes) {
      this.createEpisode(episodeData);
    }
    
    // Authentic blog posts will be added via the admin interface
  }
}

// Database storage for blog posts
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Episode operations - still use in-memory for now
  private memStorage = new MemStorage();

  async getEpisodes(page: number, limit: number): Promise<{episodes: Episode[], totalCount: number}> {
    return this.memStorage.getEpisodes(page, limit);
  }

  async getEpisodeById(id: number): Promise<Episode | undefined> {
    return this.memStorage.getEpisodeById(id);
  }

  async getEpisodeBySlug(slug: string): Promise<Episode | undefined> {
    return this.memStorage.getEpisodeBySlug(slug);
  }

  async getFeaturedEpisodes(): Promise<Episode[]> {
    return this.memStorage.getFeaturedEpisodes();
  }

  async createEpisode(episode: InsertEpisode): Promise<Episode> {
    return this.memStorage.createEpisode(episode);
  }

  async updateEpisodeAiSummary(id: number, aiSummary: string): Promise<Episode | undefined> {
    return this.memStorage.updateEpisodeAiSummary(id, aiSummary);
  }

  // Blog operations - use database
  async getBlogPosts(page: number, limit: number, category?: string | null): Promise<{posts: BlogPost[], totalCount: number}> {
    let query = db.select().from(blogPosts).orderBy(desc(blogPosts.date));
    
    if (category) {
      query = query.where(eq(blogPosts.category, category));
    }

    const posts = await query.limit(limit).offset((page - 1) * limit);
    
    // Get total count
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(blogPosts);
    if (category) {
      countQuery = countQuery.where(eq(blogPosts.category, category));
    }
    
    const [{ count }] = await countQuery;
    
    return { posts, totalCount: count };
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.date)).limit(2);
  }

  async getRecentBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.date)).limit(3);
  }

  async getBlogCategories(): Promise<string[]> {
    const result = await db.selectDistinct({ category: blogPosts.category }).from(blogPosts);
    return result.map(r => r.category);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertBlogPost).returning();
    return post;
  }

  // Other operations - delegate to memory storage for now
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return this.memStorage.getSubscriberByEmail(email);
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    return this.memStorage.createSubscriber(subscriber);
  }

  async getCommentsByEpisodeId(episodeId: string, sortBy?: 'newest' | 'top'): Promise<Comment[]> {
    return this.memStorage.getCommentsByEpisodeId(episodeId, sortBy);
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    return this.memStorage.createComment(comment);
  }

  async upvoteComment(id: number): Promise<Comment | undefined> {
    return this.memStorage.upvoteComment(id);
  }

  async downvoteComment(id: number): Promise<Comment | undefined> {
    return this.memStorage.downvoteComment(id);
  }
}

export const storage = new DatabaseStorage();
