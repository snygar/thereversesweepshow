import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/final logo Small.png";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link href="/" className="flex items-center">
            <img 
              src={logoImage} 
              alt="The Reverse Sweep Show Logo" 
              className="h-12 mr-3"
            />
            <span className="hidden md:block text-xl font-heading font-bold text-cricket-green whitespace-nowrap">
              The Reverse Sweep Show
            </span>
          </Link>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-cricket-green"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
          <Link href="/" className={`${isActive('/') ? 'text-cricket-green border-cricket-green' : 'hover:text-cricket-green border-transparent hover:border-cricket-green'} transition-colors duration-200 py-1 px-1 text-xs md:text-sm border-b-2`}>
            HOME
          </Link>
          <Link href="/episodes" className={`${isActive('/episodes') ? 'text-cricket-green border-cricket-green' : 'hover:text-cricket-green border-transparent hover:border-cricket-green'} transition-colors duration-200 py-1 px-1 text-xs md:text-sm border-b-2`}>
            EPISODES
          </Link>
          <Link href="/blog" className={`${isActive('/blog') ? 'text-cricket-green border-cricket-green' : 'hover:text-cricket-green border-transparent hover:border-cricket-green'} transition-colors duration-200 py-1 px-1 text-xs md:text-sm border-b-2`}>
            BLOG
          </Link>
          <Link href="/about" className={`${isActive('/about') ? 'text-cricket-green border-cricket-green' : 'hover:text-cricket-green border-transparent hover:border-cricket-green'} transition-colors duration-200 py-1 px-1 text-xs md:text-sm border-b-2`}>
            ABOUT
          </Link>
          <Link href="/links" className={`${isActive('/links') ? 'text-cricket-green border-cricket-green' : 'hover:text-cricket-green border-transparent hover:border-cricket-green'} transition-colors duration-200 py-1 px-1 text-xs md:text-sm border-b-2`}>
            LINKS
          </Link>
          <Link href="/contact" className={`${isActive('/contact') ? 'text-cricket-green border-cricket-green' : 'hover:text-cricket-green border-transparent hover:border-cricket-green'} transition-colors duration-200 py-1 px-1 text-xs md:text-sm border-b-2`}>
            CONTACT
          </Link>
        </div>
        
        {mobileMenuOpen && (
          <div className="w-full md:hidden mt-4" onClick={closeMobileMenu}>
            <div className="flex flex-col space-y-3 font-medium">
              <Link href="/" className={`${isActive('/') ? 'text-cricket-green' : ''} py-2 border-b border-gray-200`}>
                HOME
              </Link>
              <Link href="/episodes" className={`${isActive('/episodes') ? 'text-cricket-green' : ''} py-2 border-b border-gray-200`}>
                EPISODES
              </Link>
              <Link href="/blog" className={`${isActive('/blog') ? 'text-cricket-green' : ''} py-2 border-b border-gray-200`}>
                BLOG
              </Link>
              <Link href="/about" className={`${isActive('/about') ? 'text-cricket-green' : ''} py-2 border-b border-gray-200`}>
                ABOUT
              </Link>
              <Link href="/links" className={`${isActive('/links') ? 'text-cricket-green' : ''} py-2 border-b border-gray-200`}>
                LINKS
              </Link>
              <Link href="/contact" className={`${isActive('/contact') ? 'text-cricket-green' : ''} py-2`}>
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
