import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';
import DeveloperScene from './DeveloperScene';

function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <ThreeScene />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] order-2 lg:order-1"
          >
            <DeveloperScene />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 text-center lg:text-left order-1 lg:order-2"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
              data-testid="text-hero-name"
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Raj Suryavanshi
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-6"
              data-testid="text-hero-role"
            >
              Full Stack Developer{' '}
              <span className="text-primary">|</span>{' '}
              CSE Student
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-xl text-muted-foreground text-base md:text-lg mb-8 leading-relaxed lg:mx-0 mx-auto"
            >
              Motivated and detail-oriented Computer Science student with a strong foundation in web development, 
              problem solving, and software engineering principles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <Button
                onClick={scrollToContact}
                className="px-8"
                data-testid="button-get-in-touch"
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                onClick={scrollToAbout}
                className="px-8 bg-background/50 backdrop-blur-sm"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="https://github.com/raj659721"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                data-testid="link-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/raj-suryavanshi-158531254"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:rajsuryanshi659@gmail.com"
                className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                data-testid="link-email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground hover:text-primary transition-colors"
            data-testid="button-scroll-down"
          >
            <ArrowDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
