# The Reverse Sweep Show - Component Guide

This document provides detailed information about each component in the project, making it easier to locate and edit specific parts of the website.

## Table of Contents

- [Layout Components](#layout-components)
- [Home Page Components](#home-page-components)
- [Episode Components](#episode-components)
- [Blog Components](#blog-components)
- [Page Components](#page-components)
- [UI Components](#ui-components)

## Layout Components

### Header (client/src/components/layout/Header.tsx)

**Purpose**: Main navigation bar for the website.

**Key Features**:
- Responsive navigation with mobile menu
- Logo display
- Navigation links to main sections

**Dependencies**:
- Wouter for routing
- Icons from react-icons

**How to Edit**:
- To add a new nav item, add a new `<Link>` element in the navigation list
- Mobile menu toggle is controlled by the `isMenuOpen` state

### Footer (client/src/components/layout/Footer.tsx)

**Purpose**: Website footer with links and additional information.

**Key Features**:
- Content section links
- Quick links
- Social media links
- Podcast platform links
- Copyright notice

**Dependencies**:
- Wouter for routing
- Icons from react-icons

**How to Edit**:
- To add a new link section, add a new div with heading and ul structure
- Social media links can be updated in the first column
- Podcast platform links can be updated in the last column

## Home Page Components

### HeroSection (client/src/components/home/HeroSection.tsx)

**Purpose**: Main banner at the top of the homepage.

**Key Features**:
- Large headline and subheading
- Call-to-action buttons
- Responsive layout

**Dependencies**:
- Wouter for routing

**How to Edit**:
- Update headline text in the h1 element
- Update subheading text in the p element
- Modify CTA buttons as needed

### LatestEpisodes (client/src/components/home/LatestEpisodes.tsx)

**Purpose**: Displays featured and recent podcast episodes.

**Key Features**:
- Grid layout for episode cards
- "View All" link to episodes page
- API integration with React Query

**Dependencies**:
- React Query for data fetching
- EpisodeCard component

**How to Edit**:
- Modify the query in useQuery to change episode fetching
- Update the grid layout classes for different designs
- Change the section title or description as needed

### BlogPreview (client/src/components/home/BlogPreview.tsx)

**Purpose**: Displays featured and recent blog posts.

**Key Features**:
- Featured post with larger display
- Grid of recent posts
- "View All" link to blog page

**Dependencies**:
- React Query for data fetching
- ArticleCard component

**How to Edit**:
- Modify queries to change which posts are displayed
- Update the layout classes for different designs
- Change the section title or description as needed

### FeatureSection (client/src/components/home/FeatureSection.tsx)

**Purpose**: Highlights key features or benefits of the podcast.

**Key Features**:
- Three-column layout
- Icons and text descriptions
- Responsive design

**Dependencies**:
- Icons from react-icons or lucide-react

**How to Edit**:
- Update feature titles and descriptions in each column
- Change icons as needed
- Modify the background color or spacing

### NewsletterSignup (client/src/components/home/NewsletterSignup.tsx)

**Purpose**: Email subscription form for the newsletter.

**Key Features**:
- Form with email input
- Form validation
- Success/error messages

**Dependencies**:
- React Hook Form
- Zod for validation
- React Query for form submission

**How to Edit**:
- Modify the form submission mutation
- Update validation rules in the Zod schema
- Change success/error messages

## Episode Components

### EpisodeCard (client/src/components/episodes/EpisodeCard.tsx)

**Purpose**: Card component displaying episode information.

**Key Features**:
- Episode title and description
- Date and duration information
- Link to episode detail page
- Responsive design

**Dependencies**:
- Wouter for routing
- Date formatting utilities

**How to Edit**:
- Update the card layout or styling
- Modify what episode data is displayed
- Change the link behavior

### SpotifyPlayer (client/src/components/episodes/SpotifyPlayer.tsx)

**Purpose**: Embedded Spotify player for episodes.

**Key Features**:
- Responsive iframe for Spotify embed
- Configurable height
- Error handling

**Dependencies**:
- None external

**How to Edit**:
- Update the iframe src pattern if Spotify changes
- Modify default height or responsive behavior

## Blog Components

### ArticleCard (client/src/components/blog/ArticleCard.tsx)

**Purpose**: Card component displaying blog post information.

**Key Features**:
- Article title and excerpt
- Category and date
- Link to full article
- Optional "featured" variant for larger display

**Dependencies**:
- Wouter for routing
- Date formatting utilities

**How to Edit**:
- Update the card layout or styling
- Modify what blog data is displayed
- Change the featured variant appearance

## Page Components

### Home (client/src/pages/Home.tsx)

**Purpose**: Main landing page component.

**Key Features**:
- Combines all home page section components
- Meta title and description

**Dependencies**:
- All home section components

**How to Edit**:
- Change the order of sections
- Add or remove sections
- Update page metadata

### Episodes (client/src/pages/Episodes.tsx)

**Purpose**: Page listing all podcast episodes.

**Key Features**:
- Episode listing with pagination
- Grid layout
- Page title and description

**Dependencies**:
- React Query for data fetching
- EpisodeCard component
- Pagination component

**How to Edit**:
- Modify the query to change how episodes are fetched
- Update the grid layout or pagination
- Change page metadata

### EpisodeDetail (client/src/pages/EpisodeDetail.tsx)

**Purpose**: Page showing a single episode with details.

**Key Features**:
- Full episode information
- Embedded Spotify player
- Episode transcript (if available)
- Related episodes

**Dependencies**:
- React Query for data fetching
- SpotifyPlayer component
- Wouter for routing and URL parameters

**How to Edit**:
- Modify the query to change how the episode is fetched
- Update the layout or displayed information
- Change related episodes logic

### Blog (client/src/pages/Blog.tsx)

**Purpose**: Page listing all blog posts with filtering.

**Key Features**:
- Blog posts in grid layout
- Category filtering
- Pagination

**Dependencies**:
- React Query for data fetching
- ArticleCard component
- Pagination component

**How to Edit**:
- Modify the query to change how posts are fetched
- Update the filtering or category options
- Change the grid layout or pagination

### BlogPost (client/src/pages/BlogPost.tsx)

**Purpose**: Page showing a single blog post.

**Key Features**:
- Full blog post content
- Author information
- Category indication
- Related posts

**Dependencies**:
- React Query for data fetching
- Wouter for routing and URL parameters

**How to Edit**:
- Modify the query to change how the post is fetched
- Update the layout or displayed information
- Change related posts logic

### About (client/src/pages/About.tsx)

**Purpose**: Page with information about the podcast and team.

**Key Features**:
- Team member information
- Podcast history
- Mission statement

**How to Edit**:
- Update the content sections
- Modify team member information
- Change layout or styling

### Contact (client/src/pages/Contact.tsx)

**Purpose**: Page with contact form and information.

**Key Features**:
- Contact form
- Form validation
- Success/error messages
- Alternative contact methods

**Dependencies**:
- React Hook Form
- Zod for validation
- React Query for form submission

**How to Edit**:
- Modify the form fields or validation
- Update success/error messages
- Change alternative contact information

### StartHere (client/src/pages/StartHere.tsx)

**Purpose**: Guide page for new visitors.

**Key Features**:
- Introduction to the podcast
- Recommended episodes
- How-to-listen guide

**Dependencies**:
- React Query for data fetching
- EpisodeCard component

**How to Edit**:
- Update the introduction or recommendations
- Modify the recommended episodes query
- Change layout or styling

## UI Components

All UI components are located in `client/src/components/ui/` and are based on Shadcn UI. These components include:

- Button (button.tsx)
- Card (card.tsx)
- Dialog (dialog.tsx)
- Form components (form.tsx, input.tsx, etc.)
- Toast notifications (toast.tsx, toaster.tsx)

**How to Edit UI Components**:
1. Locate the specific component file in `client/src/components/ui/`
2. Make necessary changes while maintaining the component's API
3. Test the changes across the application

## Adding New Components

When adding new components:

1. Create a new file in the appropriate directory under `client/src/components/`
2. Follow the existing component patterns for consistency
3. Import and use any necessary UI components
4. Update this guide to include documentation for the new component

## API Integration

Most data-displaying components use React Query for API integration:

```typescript
const { data, isLoading } = useQuery<ApiResponse>({
  queryKey: ['/api/endpoint'],
  staleTime: 60 * 1000, // Cache for 1 minute
});
```

To change what data is fetched or how it's processed, modify these query configurations in the respective components.

---

Created for The Reverse Sweep Show | Last Updated: April 2025