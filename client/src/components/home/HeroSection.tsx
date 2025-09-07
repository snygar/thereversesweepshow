import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/final logo Small.png";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  return (
    <section className="bg-cricket-green text-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-4">
              The Reverse Sweep Show
            </h1>
            <p className="text-lg md:text-xl mb-8 text-cricket-offwhite">
              Bringing you deep dive cricket analysis and "what if" scenarios from the world of cricket.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/episodes">
                <Button 
                  className="bg-cricket-gold text-cricket-text font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-200"
                  onClick={() => trackEvent('click', 'hero_button', 'listen_now')}
                >
                  LISTEN NOW
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-cricket-green transition-all duration-200"
                onClick={() => {
                  trackEvent('click', 'hero_button', 'subscribe');
                  const newsletterSection = document.getElementById('newsletter');
                  if (newsletterSection) {
                    newsletterSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                SUBSCRIBE
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={logoImage}
              alt="The Reverse Sweep Show"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
