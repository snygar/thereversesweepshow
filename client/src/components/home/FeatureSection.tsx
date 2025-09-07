import { Link } from "wouter";
import { BarChart2, Mic, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-cricket-text mb-4">
            Why Listen to The Reverse Sweep Show?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our unique blend of deep cricket analysis and "what if" scenarios makes us different from any other cricket podcast.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-cricket-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart2 className="text-cricket-green text-2xl" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Deep Analysis</h3>
            <p className="text-gray-600">
              We break down cricket techniques, strategies, and statistics in ways that both casual fans and cricket experts can appreciate.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-cricket-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="text-cricket-green text-2xl" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Expert Commentary</h3>
            <p className="text-gray-600">
              Our unique perspectives and expert commentary on current cricket events give you fresh insights you won't find elsewhere.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-cricket-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="text-cricket-green text-2xl" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Creative "What Ifs"</h3>
            <p className="text-gray-600">
              Our popular alternate scenario segments explore fascinating cricket history that might have been.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/episodes">
              <Button 
                className="bg-cricket-green text-white font-bold py-3 px-8 rounded-lg hover:bg-cricket-green/90 transition-all duration-200"
              >
                START LISTENING
              </Button>
            </Link>
            <Link href="/blog">
              <Button 
                variant="outline"
                className="border-cricket-green text-cricket-green font-bold py-3 px-8 rounded-lg hover:bg-cricket-green hover:text-white transition-all duration-200"
              >
                READ OUR BLOG
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
