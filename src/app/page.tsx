import FAQs from "../../components/FAQs";
import Features from "../../components/Features";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import Pricing from "../../components/Pricing";
import Testimonials from "../../components/Testimonials";
import Users from "../../components/Users";


export default function Home() {
  return (
    <div className="">
      <main >
        <div className="bg-[#EAEAEC] w-full px-6 sm:px-12 py-4 mask-fade-bottom">
          <Navbar />
        <Hero />
        </div>

        <Users />
        <Features />
        <Pricing />
        <FAQs />
        <Testimonials />
        
      </main>
    </div>
  );
}


// Inter, Afacad, DM Sans