import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    date: 'Dec 2025',
    description:
      'Built a responsive and animated personal portfolio website showcasing projects, skills, and contact information with clean UI and optimized performance.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Responsive design for all devices',
      'Smooth animations and transitions',
      'Clean and modern UI',
      'Optimized performance',
    ],
    github: 'https://github.com/raj659721',
    live: null,
  },
  {
    id: 2,
    title: 'Student Attendance Management ERP',
    date: 'Apr 2025',
    description:
      'Built a centralized ERP system for student attendance management with real-time dashboards, dynamic charts, and secure authentication.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    features: [
      'Centralized attendance management',
      'JWT authentication for security',
      'Dynamic charts and data visualization',
      'Real-time dashboards',
    ],
    github: 'https://github.com/raj659721',
    live: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32" data-testid="section-projects">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">What I've built</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-projects-title">Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card
                  className="bg-card/50 backdrop-blur-sm border-border/50 h-full group"
                  data-testid={`card-project-${project.id}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {project.date}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                            data-testid={`link-project-github-${project.id}`}
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                            data-testid={`link-project-live-${project.id}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="mt-1.5 min-w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button
              variant="outline"
              asChild
              className="bg-background/50 backdrop-blur-sm"
            >
              <a
                href="https://github.com/raj659721"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-view-all-projects"
              >
                <Github className="h-4 w-4 mr-2" />
                View All Projects
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
