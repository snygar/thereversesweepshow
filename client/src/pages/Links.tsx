import { Button } from "@/components/ui/button";
import { ExternalLink, Music, Play, Youtube, Instagram, Home, ArrowRight } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import logoImage from "@assets/final logo Small.png";
import { trackEvent } from "@/lib/analytics";

const Links = () => {
  const links = [
    {
      title: "🎧 Listen on Spotify",
      url: "https://open.spotify.com/show/1Rh9PS3KPWtdqrSRQ3Kymi",
      icon: <Music className="w-5 h-5" />,
      description: "Stream all episodes"
    },
    {
      title: "🍎 Listen on Apple Podcasts", 
      url: "https://podcasts.apple.com/se/podcast/the-reverse-sweep-show/id1772895216",
      icon: <Play className="w-5 h-5" />,
      description: "Available on Apple Podcasts"
    },
    {
      title: "📺 Watch on YouTube",
      url: "https://www.youtube.com/@TheReverseSweepShow",
      icon: <Youtube className="w-5 h-5" />,
      description: "Video episodes and highlights"
    },
    {
      title: "📸 Follow on Instagram",
      url: "https://www.instagram.com/the_reverse_sweep_show",
      icon: <Instagram className="w-5 h-5" />,
      description: "Behind the scenes content"
    },
    {
      title: "🐦 Follow on Twitter",
      url: "https://x.com/podreversesweep?s=21",
      icon: <FaXTwitter className="w-5 h-5" />,
      description: "Latest updates and discussions"
    }
  ];

  const socialIcons = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/1Rh9PS3KPWtdqrSRQ3Kymi",
      icon: <Music className="w-5 h-5" />
    },
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/se/podcast/the-reverse-sweep-show/id1772895216", 
      icon: <Play className="w-5 h-5" />
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@TheReverseSweepShow",
      icon: <Youtube className="w-5 h-5" />
    },
    {
      name: "Instagram", 
      url: "https://www.instagram.com/the_reverse_sweep_show",
      icon: <Instagram className="w-5 h-5" />
    },
    {
      name: "Twitter", 
      url: "https://x.com/podreversesweep?s=21",
      icon: <FaXTwitter className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>The Reverse Sweep Show - Links</title>
        <meta name="description" content="Cricket's alternate universe — one 'What If' at a time. Listen to The Reverse Sweep Show on all major platforms." />
        <meta property="og:title" content="The Reverse Sweep Show - All Links" />
        <meta property="og:description" content="Cricket's alternate universe — one 'What If' at a time. Listen on Spotify, Apple Podcasts, YouTube and more." />
        <meta property="og:image" content={`https://thereversesweepshow.com${logoImage}`} />
        <meta property="og:url" content="https://thereversesweepshow.com/links" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Reverse Sweep Show - All Links" />
        <meta name="twitter:description" content="Cricket's alternate universe — one 'What If' at a time." />
        <meta name="twitter:image" content={`https://thereversesweepshow.com${logoImage}`} />
        <link rel="canonical" href="https://thereversesweepshow.com/links" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md mx-auto">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <img 
                  src={logoImage} 
                  alt="The Reverse Sweep Show Logo" 
                  className="h-20 w-20 mx-auto rounded-full shadow-lg border-4 border-white"
                />
              </div>
              
              <h1 className="text-2xl font-heading font-bold text-cricket-green mb-3">
                The Reverse Sweep Show
              </h1>
              
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                Cricket's alternate universe — one 'What If' at a time.
              </p>
            </div>

            {/* Website CTA - Prominent for Instagram visitors */}
            <div className="mb-6">
              <Link href="/">
                <Button
                  className="w-full h-16 px-6 rounded-2xl bg-cricket-green hover:bg-cricket-green/90 text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform mb-2"
                  onClick={() => trackEvent('click', 'links_page', 'explore_website')}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-bold text-sm">🏠 Explore Our Website</div>
                        <div className="text-xs opacity-90">Episodes, Blog & More</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
              </Link>
              <p className="text-center text-xs text-gray-500 mb-6">
                ↑ Visit our full cricket podcast website with episodes, analysis & insights
              </p>
            </div>

            {/* Platform Links */}
            <div className="space-y-4 mb-12">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full group"
                >
                  <Button
                    variant="outline"
                    className="w-full h-14 px-6 rounded-2xl border-2 border-gray-200 bg-white hover:bg-cricket-green hover:border-cricket-green hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] transform"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{link.title.split(' ')[0]}</span>
                        <span className="font-medium text-sm">
                          {link.title.substring(link.title.indexOf(' ') + 1)}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                    </div>
                  </Button>
                </a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                New episodes every week
              </p>
              <div className="flex justify-center gap-2 text-xs text-gray-400">
                <span>Hosted by Suyash & Abhinav</span>
              </div>
            </div>
          </div>
        </main>

        {/* Sticky Social Footer */}
        <footer className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 py-4">
          <div className="flex justify-center gap-6">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 hover:bg-cricket-green hover:text-white transition-all duration-300 hover:scale-110 transform"
                aria-label={`Follow on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">
              © 2025 The Reverse Sweep Show
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Links;