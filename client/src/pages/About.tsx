import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import podcastFoundersImg from "../assets/podcast-founders.jpeg";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - The Reverse Sweep Show</title>
        <meta name="description" content="Learn about The Reverse Sweep Show podcast, our story, and our cricket analysis approach." />
      </Helmet>

      <div className="bg-cricket-green py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold text-white mb-6">About Us</h1>
          <p className="text-cricket-offwhite text-lg max-w-3xl">
            Discover the story behind The Reverse Sweep Show and our passion for cricket analysis.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                The Reverse Sweep Show was born out of a passion for cricket and a desire to analyze the game beyond just match reports and scores. 
              </p>
              <p className="text-gray-700 mb-4">
                The idea germinated in an aptly named Friends Cafe in Baku, Azerbaijan. We decided to put our cricket conversations out there. But not of the usual kind. We wanted to be at the event horizon of cricketing imagination, exploring the game's most fascinating possibilities.
              </p>
              <p className="text-gray-700">
               We discuss the game's biggest what if moments, mad cap theories and hypothetical 11s.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-cricket-green shadow-lg">
                <img 
                  src={podcastFoundersImg}
                  alt="The Reverse Sweep Show Founders" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6">Our Approach</h2>
            <p className="text-gray-700 mb-6">
              At The Reverse Sweep Show, we believe in exploring cricket from multiple angles:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-cricket-green/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cricket-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Hypothetical Teams</h3>
                <p className="text-gray-600">
                  We create topical yet bizarre 11s backed by statistics and logic but with a dash of fun.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-cricket-green/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cricket-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Expert Commentary</h3>
                <p className="text-gray-600">
                  Our unique perspectives and expert commentary on current cricket events give you fresh insights you won't find elsewhere.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-cricket-green/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cricket-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">What If Scenarios</h3>
                <p className="text-gray-600">
                  We explore alternate cricket timelines that challenge conventional thinking and inspire cricket fans to reimagine the game.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center py-12 bg-cricket-green/10 rounded-lg mb-16">
            <h2 className="text-3xl font-heading font-bold mb-6">Join Our Community</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              The Reverse Sweep Show is more than just a podcast - it's a community of cricket fans who love discussing and debating all aspects of the game.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/episodes">
                <Button className="bg-cricket-green text-white hover:bg-cricket-green/90">
                  Listen to Episodes
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-cricket-green rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  S
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Suyash</h3>
                <p className="text-gray-700">
                  Host and cricket enthusiast who loves thinking, discussing the game and exploring hypothetical scenarios. Brings stats, passion and forgotten trivia to every episode.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-cricket-green rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  A
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Abhinav</h3>
                <p className="text-gray-700">
                  Host and cricket enthusiast who brings unique perspectives to cricket discussions. Passionate about analyzing the game, methodically presenting the nuances and loves capturing the what-ifs.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact">
                <Button variant="link" className="text-cricket-green hover:text-cricket-gold">
                  Contact Our Team →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
