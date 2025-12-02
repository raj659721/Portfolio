import { motion } from 'framer-motion';
import { Code2, Database, Wrench, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['C++', 'Java', 'Python (Beginner)'],
  },
  {
    title: 'Web Technologies',
    icon: Database,
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Git', 'VS Code', 'Postman', 'Figma'],
  },
  {
    title: 'Frameworks',
    icon: Cpu,
    skills: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function About() {
  return (
    <section id="about" className="py-20 md:py-32" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">Get to know me</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-about-title">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={itemVariants}>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Summary</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-about-summary">
                    Motivated and detail-oriented Computer Science student with a strong foundation in web development, 
                    problem solving, and software engineering principles. Skilled in building responsive websites, 
                    developing full-stack applications, and working with modern tools and frameworks.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Completed a Web Development Internship at Sumago Infotech, gaining hands-on real-world software 
                    development experience. Passionate about creating clean, efficient, and user-friendly applications.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    variants={itemVariants}
                    custom={index}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <category.icon className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">{category.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                              data-testid={`badge-skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
