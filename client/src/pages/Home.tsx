import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';

function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Resume />
        <Contact />
      </main>
    </div>
  );
}

export default Home;
