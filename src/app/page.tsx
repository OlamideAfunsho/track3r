import Features from "../../components/Features";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";


export default function Home() {
  return (
    <div className="">
      <main >
        <div className="bg-[#EAEAEC] w-full px-6 sm:px-12 py-4 mask-fade-bottom">
          <Navbar />
        <Hero />
        </div>
        
        <Features />
        
      </main>
    </div>
  );
}
