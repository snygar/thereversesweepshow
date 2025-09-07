import { Link } from "wouter";
import { 
  FaSpotify, 
  FaYoutube, 
  FaInstagram, 
  FaTwitter, 
  FaApple, 
  FaGoogle, 
  FaPodcast 
} from "react-icons/fa";
import logoImage from "@assets/final logo Small.png";

const Footer = () => {
  return (
    <footer className="bg-cricket-text text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <img 
                src={logoImage} 
                alt="The Reverse Sweep Show Logo" 
                className="h-12"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Bringing you deep dive cricket analysis and "what if" scenarios from the world of cricket.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://open.spotify.com/show/1Rh9PS3KPWtdqrSRQ3Kymi" className="text-gray-400 hover:text-cricket-gold transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                <FaSpotify className="text-xl" />
              </a>
              <a href="https://www.youtube.com/@TheReverseSweepShow" className="text-gray-400 hover:text-cricket-gold transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="text-xl" />
              </a>
              <a href="https://www.instagram.com/the_reverse_sweep_show?igsh=NGl0MnJqYWxkcHIz" className="text-gray-400 hover:text-cricket-gold transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://x.com/podreversesweep?s=21" className="text-gray-400 hover:text-cricket-gold transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Content</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/episodes" className="hover:text-white transition-colors duration-200">
                  Latest Episodes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200">
                  Blog Articles
                </Link>
              </li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Analysis Series</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">"What If" Series</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">

              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Meet The Team</a></li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li><a href="#newsletter" className="hover:text-white transition-colors duration-200">Subscribe</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Listen On</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="https://open.spotify.com/show/1Rh9PS3KPWtdqrSRQ3Kymi" className="flex items-center hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                  <FaSpotify className="mr-2" /> Spotify
                </a>
              </li>
              <li>
                <a href="https://podcasts.apple.com/se/podcast/the-reverse-sweep-show/id1772895216" className="flex items-center hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                  <FaApple className="mr-2" /> Apple Podcasts
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@TheReverseSweepShow" className="flex items-center hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="mr-2" /> YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} The Reverse Sweep Show. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
