import About from "@/components/About";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import Tech from "@/components/Tech";
import WorkExperience from "@/components/WorkExperience";

const Home = () => {
  return (
    <main className="relative bg-black-100 col center overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        <About />
        <WorkExperience />
        <RecentProjects />
        <Tech />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
