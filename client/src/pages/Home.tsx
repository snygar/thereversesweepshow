import HeroSection from "@/components/home/HeroSection";
import LatestEpisodes from "@/components/home/LatestEpisodes";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import FeatureSection from "@/components/home/FeatureSection";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>The Reverse Sweep Show - Cricket Podcast</title>
        <meta name="description" content="The Reverse Sweep Show brings you deep dive cricket analysis, player interviews and 'what if' scenarios from the world of cricket." />
      </Helmet>
      <HeroSection />
      <LatestEpisodes />
      <NewsletterSignup />
      <FeatureSection />
    </>
  );
};

export default Home;
